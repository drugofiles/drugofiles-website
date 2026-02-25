import { Metadata } from 'next'
import { PageWrapper } from '@/components/page-wrapper'
import { CTASection } from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'Privacy Policy | Drugofiles Productions',
  description: 'Informativa sulla privacy e utilizzo dei cookie di Drugofiles Productions.',
}

export default function PrivacyPage() {
  return (
    <PageWrapper showLoading={false}>
      <main className="min-h-screen bg-[#dedacf] pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1321] mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-[#0D1321]/80">
            <p className="text-lg mb-8">
              <strong>Ultimo aggiornamento:</strong> 25 Febbraio 2026
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">1. Titolare del trattamento</h2>
              <p>
                Il titolare del trattamento dei dati è <strong>Drugofiles Productions</strong>, 
                con sede a Pordenone, Italia.<br />
                Email di contatto: <a href="mailto:info@drugofiles.com" className="text-[#7353BA] hover:underline">info@drugofiles.com</a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">2. Dati raccolti</h2>
              
              <h3 className="text-xl font-medium text-[#0D1321] mb-2">Dati forniti volontariamente</h3>
              <p className="mb-4">
                Quando compili il modulo di contatto, raccogliamo:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Nome</li>
                <li>Email</li>
                <li>Tipo di progetto richiesto</li>
                <li>Messaggio</li>
              </ul>
              <p className="mb-6">
                Questi dati vengono utilizzati esclusivamente per rispondere alla tua richiesta 
                e non vengono condivisi con terze parti.
              </p>

              <h3 className="text-xl font-medium text-[#0D1321] mb-2">Dati di navigazione (cookie analitici)</h3>
              <p>
                Con il tuo consenso, utilizziamo <strong>Google Analytics</strong> per raccogliere 
                dati anonimi e aggregati sul traffico del sito:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Pagine visitate</li>
                <li>Tempo di permanenza</li>
                <li>Dispositivo e browser utilizzati</li>
                <li>Paese di provenienza (non la posizione esatta)</li>
              </ul>
              <p>
                L'indirizzo IP viene anonimizzato. Questi dati ci aiutano a capire come migliorare 
                il sito e non permettono di identificarti personalmente.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">3. Cookie utilizzati</h2>
              
              <div className="bg-[#0D1321]/5 rounded-xl p-6 mb-4">
                <h4 className="font-semibold text-[#0D1321] mb-2">Cookie tecnici (necessari)</h4>
                <p className="text-sm">
                  Essenziali per il funzionamento del sito. Memorizzano le tue preferenze sui cookie 
                  e permettono la navigazione. Non possono essere disattivati.
                </p>
              </div>

              <div className="bg-[#0D1321]/5 rounded-xl p-6">
                <h4 className="font-semibold text-[#0D1321] mb-2">Cookie analitici (Google Analytics)</h4>
                <p className="text-sm">
                  Attivati solo con il tuo consenso. Raccolgono dati anonimi sull'utilizzo del sito. 
                  Puoi revocare il consenso in qualsiasi momento cancellando i cookie del browser.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">4. I tuoi diritti</h2>
              <p className="mb-4">
                In base al GDPR e alla normativa italiana, hai diritto a:
              </p>
              <ul className="list-disc pl-6">
                <li><strong>Accesso:</strong> sapere quali dati abbiamo su di te</li>
                <li><strong>Rettifica:</strong> correggere dati errati</li>
                <li><strong>Cancellazione:</strong> richiedere la cancellazione dei tuoi dati</li>
                <li><strong>Opposizione:</strong> opporti al trattamento</li>
                <li><strong>Portabilità:</strong> ricevere i tuoi dati in formato leggibile</li>
              </ul>
              <p className="mt-4">
                Per esercitare questi diritti, scrivi a: 
                <a href="mailto:info@drugofiles.com" className="text-[#7353BA] hover:underline"> info@drugofiles.com</a>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">5. Come revocare il consenso ai cookie</h2>
              <p>
                Puoi revocare il consenso ai cookie analitici in qualsiasi momento:
              </p>
              <ol className="list-decimal pl-6">
                <li>Cancella i cookie del browser per questo sito</li>
                <li>Alla prossima visita, il banner riapparirà</li>
                <li>Scegli "Solo necessari"</li>
              </ol>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#0D1321] mb-4">6. Contatti</h2>
              <p>
                Per qualsiasi domanda sulla privacy o sui tuoi dati:<br />
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
