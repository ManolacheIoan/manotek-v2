"use client";

import { type FormEvent, useEffect, useState } from "react";
import { contact, pricingPlans, site } from "@/content/site";
import { Button } from "../ui/Button";
import { TextLink } from "../ui/TextLink";

const f = contact.form;

type Fields = { name: string; business: string; reach: string; message: string };
const empty: Fields = { name: "", business: "", reach: "", message: "" };
const required: (keyof Fields)[] = ["name", "reach", "message"];
/** id-ul din link (`?pachet=site-business`) → textul pus în mesaj („Site Business”). */
const PLANS = new Map(pricingPlans.map((p) => [p.id, p.request]));

/**
 * Formularul de contact.
 *
 * ACUM: trimite prin `mailto:` → deschide aplicația de email a vizitatorului,
 * cu subiectul și mesajul precompletate, către site.email.
 *
 * PENTRU FORMSPREE (mesajele ajung direct la tine, fără aplicația de email):
 *   1. Creează un formular gratuit pe https://formspree.io și copiază ID-ul (ex. "xyzabcd").
 *   2. Pune ID-ul în FORMSPREE_ID de mai jos. Atât: codul folosește automat Formspree
 *      când ID-ul nu e gol, iar mailto rămâne doar ca rezervă dacă trimiterea eșuează.
 *   3. Adaugă Formspree în politica de confidențialitate (content/site.ts → privacy).
 */
const FORMSPREE_ID = "";

function Field({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  multiline,
  autoComplete,
}: {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  optional?: boolean;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const inputId = `cf-${id}`;
  const errId = `${inputId}-err`;
  const common = {
    id: inputId,
    name: id,
    value,
    placeholder: " ",
    required: !optional,
    "aria-invalid": error || undefined,
    "aria-describedby": error ? errId : undefined,
    className:
      "peer block w-full resize-none border-0 border-b border-paper/30 bg-transparent px-0 pt-7 pb-3 text-[1.125rem] text-paper outline-none transition-colors duration-500 hover:border-paper/60 focus:border-paper/60 focus-visible:outline-none",
  };
  return (
    <div className="relative">
      {multiline ? (
        <textarea {...common} rows={3} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...common} type="text" autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />
      )}
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute top-7 left-0 origin-left text-[1.125rem] text-paper/62 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:-translate-y-6 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-[0.78]"
      >
        {label}
        {optional ? <span className="text-paper/62"> ({f.optional})</span> : null}
      </label>
      {/* linia aurie care se desenează la focus */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-ochre transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:scale-x-100"
      />
      {error ? (
        <p id={errId} className="mt-2 text-small text-[#F2A28F]">
          {f.required}
        </p>
      ) : null}
    </div>
  );
}

type Props = {
  /** Clase în plus pentru nota de confidențialitate (pe prima pagină îi face loc butonului „Derulează”). */
  noteClassName?: string;
};

export function ContactForm({ noteClassName = "" }: Props) {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "sent-formspree">("idle");

  // Butoanele din secțiunea Pachete deschid /audit-gratuit?pachet=<id> și completează mesajul.
  // Sunt acceptate doar pachetele existente.
  useEffect(() => {
    const onPlan = (e: Event) => {
      const plan = PLANS.get((e as CustomEvent<string>).detail);
      if (!plan) return;
      setValues((v) => (v.message.trim() ? v : { ...v, message: f.planMessage.replace("{plan}", plan) }));
    };
    window.addEventListener("manotek:plan", onPlan);
    const requested = new URLSearchParams(window.location.search).get("pachet");
    if (requested) queueMicrotask(() => window.dispatchEvent(new CustomEvent("manotek:plan", { detail: requested })));
    return () => window.removeEventListener("manotek:plan", onPlan);
  }, []);

  const set = (key: keyof Fields) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: false }));
  };

  const mailtoHref = () => {
    const body = [
      `Nume: ${values.name}`,
      `Afacere: ${values.business || "-"}`,
      `Telefon / email: ${values.reach}`,
      "",
      values.message,
    ].join("\n");
    const subject = `${f.emailSubject}${values.business ? ` – ${values.business}` : ""}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, boolean>> = {};
    for (const k of required) next[k] = !values[k].trim();
    setErrors(next);
    const firstInvalid = required.find((k) => next[k]);
    if (firstInvalid) {
      document.getElementById(`cf-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, _subject: f.emailSubject }),
        });
        if (res.ok) {
          setValues(empty);
          setStatus("sent-formspree");
          return;
        }
      } catch {
        /* cade pe mailto mai jos */
      }
    }
    window.location.href = mailtoHref();
    setStatus("sent");
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-7" aria-describedby="cf-privacy">
      <div className="grid gap-7 md:grid-cols-2 md:gap-x-8">
        <Field id="name" label={f.name} value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
        <Field
          id="business"
          label={f.business}
          value={values.business}
          onChange={set("business")}
          optional
          autoComplete="organization"
        />
      </div>
      <Field id="reach" label={f.reach} value={values.reach} onChange={set("reach")} error={errors.reach} autoComplete="tel" />
      <Field id="message" label={f.message} value={values.message} onChange={set("message")} error={errors.message} multiline />

      <div className="pt-3">
        <Button type="submit" variant="primary-dark" arrow disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
        </Button>
        <p id="cf-privacy" className={`mt-6 max-w-[36rem] text-small text-pretty text-paper/62 ${noteClassName}`}>
          {f.privacy}{" "}
          <TextLink href="/confidentialitate" staticLine className="text-paper">
            {f.privacyLink}
          </TextLink>
          .
        </p>

        {/* Cât e gol nu ocupă loc: formularul se termină la notă, ca secțiunea să se poată centra exact */}
        <div role="status" aria-live="polite">
          {status === "sent" ? (
            <p className="mt-7 border-l border-ochre pl-5 text-body text-paper/80">
              {f.success}{" "}
              <a href={`mailto:${site.email}`} className="u-link u-link--static text-paper">
                {site.email}
              </a>
              .
            </p>
          ) : null}
          {status === "sent-formspree" ? <p className="mt-7 border-l border-ochre pl-5 text-body text-paper/80">{f.successFormspree}</p> : null}
        </div>
      </div>
    </form>
  );
}
