import { Metadata } from 'next'
import { PageWrapper } from '@/components/page-wrapper'
import { CTASection } from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'Privacy Policy e Cookie Policy | Drugofiles Productions',
  description: 'Informativa sulla privacy, utilizzo dei cookie e trattamento dei dati personali di Drugofiles Productions.',
}

export default function PrivacyPage() {
  return (
    <PageWrapper showLoading={false}>
      <main className="min-h-screen bg-[#dedacf] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1321] mb-8">
            Privacy Policy e Cookie Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-[#0D1321]/80">
            <p className="text-lg mb-8">
              <strong>Ultimo aggiornamento:</strong> 25 Febbraio 2026
            </p>

            {/* SEZIONE 1: TITOLARE */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">1. Titolare del trattamento</h2>
              <p>
                Il titolare del trattamento dei dati è <strong>Drugofiles Productions di Misha Kryzhevskykh</strong>, 
                con sede a Pordenone (PN), Italia.<br />
                Email di contatto: <a href="mailto:info@drugofiles.com" className="text-[#7353BA] hover:underline">info@drugofiles.com</a>
              </p>
            </section>

            {/* SEZIONE 2: DATI RACCOLTI */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">2. Dati personali raccolti</h2>
              
              <h3 className="text-xl font-medium text-[#0D1321] mb-2">2.1 Dati forniti volontariamente</h3>
              <p className="mb-4">
                Quando compili il modulo di contatto, raccogliamo:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Nome</li>
                <li>Indirizzo email</li>
                <li>Nome azienda (se applicabile)</li>
                <li>Tipo di progetto richiesto</li>
                <li>Messaggio</li>
              </ul>
              <p className="mb-6">
                <strong>Finalità:</strong> Rispondere alla tua richiesta di contatto e fornirti informazioni sui nostri servizi.<br />
                <strong>Base giuridica:</strong> Esecuzione di misure precontrattuali (Art. 6.1.b GDPR).<br />
                <strong>Conservazione:</strong> I dati vengono conservati per 24 mesi dall'ultimo contatto.
              </p>

              <h3 className="text-xl font-medium text-[#0D1321] mb-2">2.2 Dati di navigazione</h3>
              <p>
                Con il tuo consenso esplicito, raccogliamo dati anonimi tramite Google Analytics per comprendere 
                come i visitatori utilizzano il sito. Vedi la sezione Cookie per maggiori dettagli.
              </p>
            </section>

            {/* SEZIONE 3: COOKIE POLICY */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">3. Cookie Policy</h2>
              
              <p className="mb-6">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. 
                Questo sito utilizza diverse tipologie di cookie, come descritto di seguito.
              </p>

              <h3 className="text-xl font-medium text-[#0D1321] mb-4">3.1 Cookie tecnici (necessari)</h3>
              <div className="bg-[#0D1321]/5 rounded-xl p-6 mb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#0D1321]/20">
                      <th className="text-left py-2 font-semibold">Nome</th>
                      <th className="text-left py-2 font-semibold">Fornitore</th>
                      <th className="text-left py-2 font-semibold">Finalità</th>
                      <th className="text-left py-2 font-semibold">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#0D1321]/10">
                      <td className="py-2">cookie-consent</td>
                      <td className="py-2">Drugofiles</td>
                      <td className="py-2">Memorizza la tua scelta sui cookie</td>
                      <td className="py-2">12 mesi</td>
                    </tr>
                    <tr className="border-b border-[#0D1321]/10">
                      <td className="py-2">cookie-consent-date</td>
                      <td className="py-2">Drugofiles</td>
                      <td className="py-2">Data del consenso</td>
                      <td className="py-2">12 mesi</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs mt-3 text-[#0D1321]/60">
                  I cookie tecnici sono essenziali per il funzionamento del sito e non possono essere disattivati. 
                  Non richiedono consenso ai sensi dell'Art. 122 del Codice Privacy.
                </p>
              </div>

              <h3 className="text-xl font-medium text-[#0D1321] mb-4">3.2 Cookie analitici (Google Analytics)</h3>
              <div className="bg-[#0D1321]/5 rounded-xl p-6 mb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#0D1321]/20">
                      <th className="text-left py-2 font-semibold">Nome</th>
                      <th className="text-left py-2 font-semibold">Fornitore</th>
                      <th className="text-left py-2 font-semibold">Finalità</th>
                      <th className="text-left py-2 font-semibold">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#0D1321]/10">
                      <td className="py-2">_ga</td>
                      <td className="py-2">Google</td>
                      <td className="py-2">Distingue gli utenti</td>
                      <td className="py-2">2 anni</td>
                    </tr>
                    <tr className="border-b border-[#0D1321]/10">
                      <td className="py-2">_ga_*</td>
                      <td className="py-2">Google</td>
                      <td className="py-2">Mantiene lo stato della sessione</td>
                      <td className="py-2">2 anni</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs mt-3 text-[#0D1321]/60">
                  <strong>Questi cookie vengono installati SOLO dopo il tuo consenso esplicito.</strong><br />
                  L'indirizzo IP viene anonimizzato (anonymize_ip: true). I dati sono aggregati e non permettono l'identificazione personale.
                </p>
                <p className="text-xs mt-2">
                  <strong>Privacy Policy di Google:</strong>{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#7353BA] hover:underline">
                    https://policies.google.com/privacy
                  </a><br />
                  <strong>Opt-out Google Analytics:</strong>{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#7353BA] hover:underline">
                    https://tools.google.com/dlpage/gaoptout
                  </a>
                </p>
              </div>

              <h3 className="text-xl font-medium text-[#0D1321] mb-4">3.3 Come gestire i cookie</h3>
              <p className="mb-4">
                Puoi modificare le tue preferenze sui cookie in qualsiasi momento:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Icona cookie:</strong> Clicca sull'icona 🍪 in basso a sinistra su qualsiasi pagina del sito</li>
                <li><strong>Impostazioni browser:</strong> Puoi bloccare o eliminare i cookie dalle impostazioni del tuo browser</li>
              </ul>
              <p className="text-sm text-[#0D1321]/60">
                Nota: La disattivazione dei cookie analitici non compromette la navigazione del sito.
              </p>
            </section>

            {/* SEZIONE 4: DIRITTI */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">4. I tuoi diritti (GDPR)</h2>
              <p className="mb-4">
                In base al Regolamento UE 2016/679 (GDPR) e al D.lgs. 196/2003, hai diritto a:
              </p>
              <ul className="list-disc pl-6">
                <li><strong>Accesso (Art. 15):</strong> Ottenere conferma dell'esistenza di dati che ti riguardano</li>
                <li><strong>Rettifica (Art. 16):</strong> Correggere dati inesatti</li>
                <li><strong>Cancellazione (Art. 17):</strong> Richiedere la cancellazione dei tuoi dati ("diritto all'oblio")</li>
                <li><strong>Limitazione (Art. 18):</strong> Limitare il trattamento in determinati casi</li>
                <li><strong>Portabilità (Art. 20):</strong> Ricevere i tuoi dati in formato strutturato</li>
                <li><strong>Opposizione (Art. 21):</strong> Opporti al trattamento</li>
                <li><strong>Revoca del consenso:</strong> Revocare il consenso ai cookie analitici in qualsiasi momento</li>
              </ul>
              <p className="mt-4">
                Per esercitare questi diritti, scrivi a: 
                <a href="mailto:info@drugofiles.com" className="text-[#7353BA] hover:underline"> info@drugofiles.com</a>
              </p>
              <p className="mt-2">
                Hai inoltre il diritto di proporre reclamo al <strong>Garante per la protezione dei dati personali</strong>: 
                <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#7353BA] hover:underline">
                  www.garanteprivacy.it
                </a>
              </p>
            </section>

            {/* SEZIONE 5: SICUREZZA */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">5. Sicurezza dei dati</h2>
              <p>
                Adottiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali 
                da accessi non autorizzati, perdita o distruzione. Il sito utilizza connessione HTTPS crittografata.
              </p>
            </section>

            {/* SEZIONE 6: TRASFERIMENTO DATI */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">6. Trasferimento dati extra-UE</h2>
              <p>
                I dati raccolti tramite Google Analytics potrebbero essere trasferiti verso server situati negli Stati Uniti. 
                Google LLC aderisce al Data Privacy Framework UE-USA, garantendo un livello di protezione adeguato 
                ai sensi dell'Art. 45 GDPR.
              </p>
            </section>

            {/* SEZIONE 7: CONTATTI */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">7. Contatti</h2>
              <p>
                Per qualsiasi domanda sulla privacy o sul trattamento dei tuoi dati:<br />
                <strong>Email:</strong> <a href="mailto:info@drugofiles.com" className="text-[#7353BA] hover:underline">info@drugofiles.com</a><br />
                <strong>Sito:</strong> <a href="https://www.drugofiles.com" className="text-[#7353BA] hover:underline">www.drugofiles.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <CTASection />
    </PageWrapper>
  )
}
