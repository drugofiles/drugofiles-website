'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, X } from 'lucide-react'

interface ContactOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const questions = [
  {
    id: 1,
    question: "Come ti chiami?",
    placeholder: "Scrivi il tuo nome...",
    type: "text",
    field: "name"
  },
  {
    id: 2,
    question: "Sei un privato o un'azienda?",
    placeholder: "Seleziona...",
    type: "select",
    field: "clientType",
    options: ["Privato", "Azienda"]
  },
  {
    id: 3,
    question: "Qual è il nome della tua azienda?",
    placeholder: "Nome azienda...",
    type: "text",
    field: "company",
    conditional: { field: "clientType", value: "Azienda" }
  },
  {
    id: 4,
    question: "Di che tipo di progetto hai bisogno?",
    placeholder: "Seleziona...",
    type: "select",
    field: "projectType",
    options: ["Commercial / Spot pubblicitari", "Entertainment / Video musicali", "Premium / Eventi privati", "Altro"]
  },
  {
    id: 5,
    question: "Raccontaci brevemente il tuo progetto",
    placeholder: "Descrivi la tua idea...",
    type: "textarea",
    field: "description"
  },
  {
    id: 6,
    question: "Entro quando vorresti realizzarlo?",
    placeholder: "Seleziona...",
    type: "select",
    field: "timeline",
    options: ["Il prima possibile", "Entro 1 mese", "Entro 3 mesi", "Entro 6 mesi", "Non ho fretta"]
  },
  {
    id: 7,
    question: "Come possiamo contattarti?",
    placeholder: "Email o numero di telefono...",
    type: "text",
    field: "contact"
  }
]

export function ContactOverlay({ isOpen, onClose }: ContactOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  // Detect keyboard on mobile
  useEffect(() => {
    const handleResize = () => {
      // If viewport height is significantly smaller than window height, keyboard is likely open
      if (typeof window !== 'undefined' && window.visualViewport) {
        const isKeyboard = window.visualViewport.height < window.innerHeight * 0.75
        setKeyboardVisible(isKeyboard)
      }
    }

    if (typeof window !== 'undefined' && window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      return () => window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  // Filter questions based on conditional logic
  const activeQuestions = questions.filter(q => {
    if (!q.conditional) return true
    return answers[q.conditional.field] === q.conditional.value
  })

  const currentQuestion = activeQuestions[currentStep]
  const totalSteps = activeQuestions.length

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: answers.name || '',
          email: answers.contact || '',
          company: answers.clientType === 'Azienda' ? answers.company : 'Privato',
          message: `Tipo cliente: ${answers.clientType || 'N/A'}\nTipo progetto: ${answers.projectType || 'N/A'}\nDescrizione: ${answers.description || 'N/A'}\nTimeline: ${answers.timeline || 'N/A'}`,
          projectType: answers.projectType || '',
          sendEmail: true
        })
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setCurrentStep(0)
      setAnswers({})
      setIsSubmitted(false)
    }, 300)
  }

  const handleInputChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.field]: value })
  }

  const canProceed = answers[currentQuestion?.field]?.trim()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-[#DFD295] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 p-3 bg-[#0D1321] text-[#FFF8F0] rounded-full hover:bg-[#0D1321]/80 transition-colors duration-200"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className={`px-6 sm:px-10 pt-6 sm:pt-8 pr-16 sm:pr-20 transition-all duration-300 ${keyboardVisible ? 'pt-2 sm:pt-4' : ''}`}>
            <p className="text-[#0D1321]/50 text-sm mb-2 font-medium uppercase tracking-wider">Get in touch</p>
            <p className={`text-[#0D1321] text-sm sm:text-base max-w-md transition-all duration-300 ${keyboardVisible ? 'hidden sm:block' : ''}`} style={{ lineHeight: '1.7' }}>
              Saremo felici di discutere del tuo brand, dei tuoi obiettivi e delle tue idee.
            </p>
          </div>

          {/* Main Content */}
          <div className={`min-h-[50vh] flex items-start sm:items-center justify-center px-6 sm:px-10 pb-8 sm:pb-20 transition-all duration-300 ${keyboardVisible ? 'pt-2 min-h-0' : 'pt-8 sm:pt-4'}`}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D1321] mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Grazie<span className="text-[#7353BA]">!</span>
                </h2>
                <p className="text-[#0D1321]/60 text-lg mb-8" style={{ lineHeight: '1.7' }}>
                  Ti contatteremo al più presto.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#0D1321] text-[#FFF8F0] font-semibold rounded-lg hover:bg-[#0D1321]/80 transition-all duration-200 shadow-button"
                >
                  Chiudi
                </button>
              </motion.div>
            ) : (
              <div className="w-full max-w-5xl flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-8 lg:gap-16">
                {/* Question */}
                <motion.div
                  key={`question-${currentStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 w-full"
                >
                  <h2 className={`font-bold text-[#0D1321] leading-tight transition-all duration-300 ${keyboardVisible ? 'text-xl sm:text-3xl' : 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'}`} style={{ letterSpacing: '-0.02em' }}>
                    {currentQuestion?.question}
                  </h2>
                  
                  {/* Step indicator */}
                  <div className={`flex items-baseline gap-1 transition-all duration-300 ${keyboardVisible ? 'mt-2 sm:mt-6' : 'mt-6 sm:mt-10'}`}>
                    <span className={`font-bold text-[#7353BA] transition-all duration-300 ${keyboardVisible ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>{currentStep + 1}</span>
                    <span className={`text-[#0D1321]/20 font-medium transition-all duration-300 ${keyboardVisible ? 'text-lg sm:text-2xl' : 'text-xl sm:text-2xl lg:text-3xl'}`}>/{totalSteps}</span>
                  </div>
                </motion.div>

                {/* Input */}
                <motion.div
                  key={`input-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 w-full"
                >
                  <div className={`bg-[#0D1321] rounded-xl transition-all duration-300 ${keyboardVisible ? 'p-4 sm:p-6' : 'p-5 sm:p-6 lg:p-8'}`}>
                    {/* Select Options */}
                    {currentQuestion?.type === 'select' && currentQuestion.options && (
                      <div className="flex flex-col gap-3 mb-5">
                        {currentQuestion.options.map((option: string) => (
                          <div
                            key={option}
                            onClick={() => handleInputChange(option)}
                            className={`w-full text-left px-5 py-4 rounded-lg text-sm sm:text-base font-medium cursor-pointer transition-colors ${
                              answers[currentQuestion.field] === option
                                ? 'bg-[#7353BA] text-[#FFF8F0]'
                                : 'bg-[#FFF8F0]/10 text-[#FFF8F0]'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Textarea */}
                    {currentQuestion?.type === 'textarea' && (
                      <textarea
                        value={answers[currentQuestion.field] || ''}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className={`w-full bg-transparent text-[#FFF8F0] placeholder-[#FFF8F0]/40 focus:outline-none resize-none mb-5 transition-all duration-300 ${keyboardVisible ? 'h-20 text-base' : 'h-32 sm:h-40 text-base sm:text-lg'}`}
                        autoFocus
                      />
                    )}
                    
                    {/* Text Input */}
                    {currentQuestion?.type === 'text' && (
                      <input
                        type="text"
                        value={answers[currentQuestion.field] || ''}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className={`w-full bg-transparent text-[#FFF8F0] placeholder-[#FFF8F0]/40 focus:outline-none font-medium mb-5 transition-all duration-300 ${keyboardVisible ? 'text-lg' : 'text-lg sm:text-xl lg:text-2xl'}`}
                        onKeyDown={(e) => e.key === 'Enter' && canProceed && handleNext()}
                        autoFocus
                      />
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center gap-3">
                      {/* Back button */}
                      {currentStep > 0 && (
                        <button
                          onClick={handleBack}
                          className="px-4 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 bg-[#FFF8F0]/20 text-[#FFF8F0] hover:bg-[#FFF8F0]/30 transition-all duration-200"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Indietro
                        </button>
                      )}

                      {/* Next/Submit button */}
                      <button
                        onClick={handleNext}
                        disabled={!canProceed || isSubmitting}
                        className={`px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-200 ${
                          canProceed
                            ? 'bg-[#7353BA] text-[#FFF8F0] hover:bg-[#5D4399]'
                            : 'bg-[#FFF8F0]/20 text-[#FFF8F0]/40 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? 'Invio...' : currentStep === totalSteps - 1 ? 'Invia' : 'Continua'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
