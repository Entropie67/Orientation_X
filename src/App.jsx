import { useMemo, useState } from 'react'

const specialties = ['Maths', 'NSI', 'Physique-Chimie', 'SVT', 'SES', 'HGGSP', 'HLP', 'CAV', 'SI']

const interestBlocks = [
  { id: 'sci', title: 'Sciences, ingénierie, prépa, informatique', icon: '🧪', hint: 'Tu aimes résoudre, modéliser, coder, construire.' },
  { id: 'health', title: 'Santé, médecine, sciences du vivant', icon: '🩺', hint: 'Biologie, soin, corps humain, santé publique.' },
  { id: 'hum', title: 'Sciences humaines, droit, économie, géopolitique', icon: '🌍', hint: 'Société, actualité, argumentation, enjeux globaux.' },
  { id: 'lit', title: 'Littérature, culture, philosophie, communication', icon: '📚', hint: 'Analyse, langue, expression, réflexion.' },
  { id: 'art', title: 'Arts, cinéma, audiovisuel, création', icon: '🎬', hint: 'Image, récit, esthétique, création visuelle.' },
  { id: 'unknown', title: 'Je ne sais pas encore', icon: '🧭', hint: 'Tu explores, et c’est normal.' },
]

const firstYearSubjects = ['Maths', 'Français', 'Histoire-Géo', 'Physique-Chimie', 'SVT', 'Anglais', 'NSI / logique']
const levelLabels = ['Faible', 'Moyen', 'Bon', 'Très bon']

function cardClass(selected) {
  return `rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
    selected
      ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-100 shadow-card'
      : 'border-slate-200 bg-white hover:border-brand-100 hover:shadow-card'
  }`
}

function App() {
  const [step, setStep] = useState('home')
  const [track, setTrack] = useState(null)
  const [selectedSpecialties, setSelectedSpecialties] = useState([])
  const [grades, setGrades] = useState({})
  const [interest, setInterest] = useState(null)

  const toggleSpecialty = (item) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(item)) return prev.filter((s) => s !== item)
      if (prev.length >= 3) return prev
      return [...prev, item]
    })
  }

  const gradeSubjects = track === 'terminale' ? [...selectedSpecialties, 'Maths (optionnel)', 'Français (optionnel)'] : firstYearSubjects

  const result = useMemo(() => {
    if (!track || !interest) return null

    const score = (key) => Number(grades[key] ?? 2)
    const nsiAffinity = score('Maths') + score('NSI / logique') >= 5 || selectedSpecialties.includes('NSI')

    if (track === 'premiere') {
      let recommended = ['Maths', 'Physique-Chimie', 'NSI']
      let alternative = ['Maths', 'SVT', 'NSI']
      let reason = 'Profil analytique : tu combines sciences fondamentales et compétences numériques transversales.'
      let warning = 'Vérifie que la charge de travail scientifique te convient sur la durée.'

      if (interest === 'health') {
        recommended = ['SVT', 'Physique-Chimie', nsiAffinity ? 'NSI' : 'Maths']
        alternative = ['SVT', 'Maths', 'Physique-Chimie']
        reason = 'Pour la santé, un socle SVT + Physique-Chimie est stratégique. NSI peut renforcer méthode et data.'
      }
      if (interest === 'hum') {
        recommended = ['SES', 'HGGSP', nsiAffinity ? 'NSI' : 'Maths']
        alternative = ['SES', 'HGGSP', 'HLP']
        reason = 'Tu construis un profil solide en sciences humaines, avec une ouverture numérique utile en supérieur.'
      }
      if (interest === 'lit') {
        recommended = ['HLP', 'HGGSP', nsiAffinity ? 'NSI' : 'SES']
        alternative = ['HLP', 'SES', 'HGGSP']
        reason = 'Tu valorises l’expression, l’analyse et la culture générale, avec une dimension stratégique.'
      }
      if (interest === 'art') {
        recommended = ['CAV', 'HLP', nsiAffinity ? 'NSI' : 'HGGSP']
        alternative = ['CAV', 'SES', 'HLP']
        reason = 'Le duo création + culture est renforcé par NSI pour la production, l’écriture et les formats numériques.'
      }

      const nsiNote = recommended.includes('NSI')
        ? 'NSI est un atout transversal fort pour ton profil : raisonnement, outils numériques, projets concrets.'
        : 'NSI reste une alternative pertinente si tu veux garder une forte dimension numérique.'

      return {
        title: 'Tes 3 spécialités conseillées',
        recommended,
        alternative,
        reason,
        warning,
        nsiNote,
      }
    }

    const hasNsi = selectedSpecialties.includes('NSI')
    const hasMaths = selectedSpecialties.includes('Maths')
    const hasPc = selectedSpecialties.includes('Physique-Chimie')
    const hasSvt = selectedSpecialties.includes('SVT')
    const hasCav = selectedSpecialties.includes('CAV')

    let keep = selectedSpecialties.slice(0, 2)
    let reason = 'Ce duo maintient un bon équilibre entre cohérence académique et options post-bac.'
    let option = 'Regarde les options complémentaires selon ton projet (maths expertes, etc.).'
    let warning = 'Évite un duo trop éloigné de ton projet final.'

    if (hasNsi && (hasMaths || hasPc || hasCav || interest === 'hum')) {
      keep = hasMaths ? ['Maths', 'NSI'] : [selectedSpecialties.find((s) => s !== 'NSI') || 'Physique-Chimie', 'NSI']
      reason = 'Duo stratégique : NSI apporte une compétence transversale très valorisée, en appui de ta spécialité principale.'
      option = hasCav ? 'Option complémentaire: projet audiovisuel numérique ou portfolio créatif-tech.' : 'Option complémentaire: approfondissement méthodologique selon la filière visée.'
      warning = 'Conserve un socle cohérent avec les attendus Parcoursup de tes formations cibles.'
    } else if (hasSvt && hasPc) {
      keep = ['SVT', 'Physique-Chimie']
      reason = 'Duo robuste pour santé et sciences du vivant, avec une base expérimentale solide.'
      option = 'Option complémentaire possible : renforcement scientifique ou numérique selon ton projet.'
    }

    return {
      title: 'Les 2 spécialités à garder',
      keep,
      reason,
      option,
      warning,
    }
  }, [track, grades, interest, selectedSpecialties])

  const canContinueFromNotes = Object.keys(grades).length >= (track === 'terminale' ? 3 : 5)

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-10">
        {step === 'home' && (
          <section className="space-y-8 text-center">
            <span className="inline-flex rounded-full bg-brand-50 px-4 py-1 text-sm font-medium text-brand-700">Gymnase Jean Sturm • Strasbourg</span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Choisis tes spécialités avec confiance.</h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">Un parcours simple et visuel pour t’aider à faire un choix pertinent selon ton niveau, tes goûts et ton projet.</p>
            </div>
            <button onClick={() => setStep('level')} className="w-full rounded-2xl bg-brand-500 px-6 py-4 text-lg font-semibold text-white transition hover:bg-brand-700 sm:w-auto">Commencer</button>
          </section>
        )}

        {step === 'level' && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Étape 1 — Ton niveau à la rentrée</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <button className={cardClass(track === 'premiere')} onClick={() => setTrack('premiere')}>
                <p className="text-xl font-semibold">Je passe en Première</p>
                <p className="mt-1 text-sm text-slate-600">On te recommandera un trio de spécialités cohérent.</p>
              </button>
              <button className={cardClass(track === 'terminale')} onClick={() => setTrack('terminale')}>
                <p className="text-xl font-semibold">Je passe en Terminale</p>
                <p className="mt-1 text-sm text-slate-600">On t’aidera à garder les 2 spécialités les plus stratégiques.</p>
              </button>
            </div>
            <button
              disabled={!track}
              onClick={() => setStep(track === 'terminale' ? 'specialties' : 'grades')}
              className="w-full rounded-2xl bg-brand-500 px-6 py-4 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continuer
            </button>
          </section>
        )}

        {step === 'specialties' && track === 'terminale' && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Tes 3 spécialités actuelles en Première</h2>
            <p className="text-sm text-slate-600">Sélectionne exactement 3 spécialités.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specialties.map((item) => (
                <button key={item} onClick={() => toggleSpecialty(item)} className={cardClass(selectedSpecialties.includes(item))}>
                  <span className="font-medium">{item}</span>
                </button>
              ))}
            </div>
            <button
              disabled={selectedSpecialties.length !== 3}
              onClick={() => setStep('grades')}
              className="w-full rounded-2xl bg-brand-500 px-6 py-4 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continuer
            </button>
          </section>
        )}

        {step === 'grades' && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Étape Notes — Rapide et simple</h2>
            <p className="text-sm text-slate-600">Choisis ton niveau ressenti pour chaque matière, sans pression.</p>
            <div className="space-y-4">
              {gradeSubjects.map((subject) => (
                <div key={subject} className="rounded-2xl border border-slate-200 p-4">
                  <p className="mb-3 font-medium">{subject}</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {levelLabels.map((label, idx) => (
                      <button
                        key={label}
                        onClick={() => setGrades((prev) => ({ ...prev, [subject]: idx + 1 }))}
                        className={cardClass(grades[subject] === idx + 1)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              disabled={!canContinueFromNotes}
              onClick={() => setStep('interests')}
              className="w-full rounded-2xl bg-brand-500 px-6 py-4 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Continuer
            </button>
          </section>
        )}

        {step === 'interests' && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Centres d’intérêt & projet</h2>
            <p className="text-sm text-slate-600">Choisis le bloc qui te ressemble le plus aujourd’hui.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {interestBlocks.map((block) => (
                <button key={block.id} onClick={() => setInterest(block.id)} className={cardClass(interest === block.id)}>
                  <p className="text-2xl">{block.icon}</p>
                  <p className="mt-1 font-semibold">{block.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{block.hint}</p>
                </button>
              ))}
            </div>
            <button
              disabled={!interest}
              onClick={() => setStep('result')}
              className="w-full rounded-2xl bg-brand-500 px-6 py-4 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Voir mon résultat
            </button>
          </section>
        )}

        {step === 'result' && result && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Résultat personnalisé</h2>
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <p className="text-sm font-medium uppercase tracking-wide text-brand-700">{result.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(result.recommended || result.keep).map((item) => (
                  <span key={item} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm">{item}</span>
                ))}
              </div>
            </div>

            {result.alternative && (
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="font-semibold">Alternative possible</p>
                <p className="mt-2 text-slate-700">{result.alternative.join(' + ')}</p>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="font-semibold">Pourquoi ce choix ?</p>
                <p className="mt-2 text-slate-700">{result.reason}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="font-semibold">Point de vigilance</p>
                <p className="mt-2 text-slate-700">{result.warning}</p>
              </div>
            </div>

            {result.nsiNote && (
              <div className="rounded-2xl border border-brand-100 bg-white p-5">
                <p className="font-semibold text-brand-900">Place de NSI dans ton profil</p>
                <p className="mt-2 text-slate-700">{result.nsiNote}</p>
              </div>
            )}

            {result.option && (
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="font-semibold">Option complémentaire à envisager</p>
                <p className="mt-2 text-slate-700">{result.option}</p>
              </div>
            )}

            <button
              onClick={() => {
                setStep('home')
                setTrack(null)
                setSelectedSpecialties([])
                setGrades({})
                setInterest(null)
              }}
              className="w-full rounded-2xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Recommencer
            </button>
          </section>
        )}
      </div>
    </main>
  )
}

export default App
