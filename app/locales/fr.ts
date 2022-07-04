/* eslint-disable quotes */
export default {
  yes: 'Oui',
  no: 'Non',
  back: 'etour',
  select: 'Select',
  backHome: 'Retour',
  notNow: 'Plus tard',
  symptoms: 'Symptômes',
  refresh: 'Tirer pour rafraîchir',
  day: 'Jour %{index} - %{date}',
  done: 'Fini',
  skip: 'Passer',
  NAV: {
    today: `Aujourd'hui`,
    medication: 'Médication',
    settings: 'Paramètres',
    checkSymptoms: 'Vérifier Symptômes',
    treatmentToday: `Aujourd'hui`,
    takeSurvey: 'Sondages',
    answerQuestions: 'Sondage',
    ClinicalModules: 'Module Clinique',
    messagesToGP: 'Messages au GP',
    sondagesRésultats: 'Résultats des sondages',
    aboutApp: `À propos de l'application`,
  },
  ONB: {
    slideOne: 'Restez en contact avec votre MD',
    slideOneDetails: `Obtenez votre module clinique et votre nouveau code de surveillance et saisissez-le dans l'application.`,
    slideTwo: `Restez en contact avec le module`,
    slideTwoDetails:
      'Suivez votre module de surveillance et autorisez les notifications, pour tous les rappels.',
    slideThree: 'Enregistrez vos symptômes',
    slideThreeDetails:
      'Répondez à toutes les questions concernant vos symptômes et sondages et partagez-les avec votre médecin.',
  },
  HOME: {
    today: `aujourd'hui`,
    yesterday: 'hier',
    both: `hier et aujourd'hui`,
    welcome: 'Bienvenue à votre module clinique',
    symptoms: 'Symptômes',
    symptoms_text: 'Vous pouvez évaluer vos symptômes dès maintenant.',
    symptoms_text_empty:
      'Aucun symptôme à évaluer. Contactez votre médecin pour un nouveau code.',
    treatment: 'Traitement',
    treatment_text: 'Vous avez %{count} médicaments à confirmer pendant %{days} jours.',
    treatment_text_zero:
      'Aucun médicament pour vous en ce moment. Vous recevrez des alertes quand il sera les temps.',
    treatment_text_empty:
      'Vérifiez les médicaments dont vous avez besoin pour confirmer la prise.',
    surveys: 'Sondages',
    surveys_text: 'Vous pouvez dès maintenant répondre à le sondage.',
    surveys_text_empty:
      'Aucun sondage pour vous pour le moment. Contactez votre médecin pour une nouvelle sondage.',
  },
  REGISTER: {
    welcome: 'Bienvenue à MyClinical',
    enter_code:
      'Entrez ci-dessous le code de traitement que vous avez reçu de votre médecin.',
    select: 'Sélectionnez le type de votre vaccin.',
    loading: 'chargement des traitements ...',
    description: 'Description:',
    duration: 'Durée: %{duration} jours',
  },
  MODULE: {
    medic: 'Médecin',
    active: 'Actif depuis',
    medication: 'Médicaments',
    noMedication: 'Aucun médicaments inclus.',
    noModule: 'Aucun Module Clinique trouvé!',
    backButton: 'Retour',
    viewButton: 'Détails des Médicaments',
    checkText:
      'Vous devez vérifier auprès de votre médecin pour un nouveau module clinique.',
    days: 'jours',
    description: 'Description',
  },
  MED: {
    notYet: 'Pas encore pris',
    shouldTake: '% {who} devrait maintenant prendre à ',
    oldConfirm: `Pouvez-vous confirmer que vous l'avez pris?`,
    confirm: 'veuillez confirmer',
    taken: 'Pris',
    reason: `ou pourquoi ne l'avez-vous pas pris?`,
  },
  MEDICATIONS: {
    title: 'Aucun médicament trouvé!',
    info: 'Votre module clinique ne contient aucun médicament.',
    question: 'Voulez-vous vérifier vos symptômes maintenant?',
  },
  TMT: {
    title: 'Plus de médicaments pour vous maintenant.',
    info: 'Vous pouvez continuer avec les symptômes.',
    notFound: 'Aucun traitement trouvé.',
    contactMD:
      'Veuillez contacter votre médecin pour obtenir votre nouveau traitement si vous en avez besoin.',
    notToday: `Pas de médicaments pour vous aujourd'hui.`,
    warning:
      'Veuillez contacter votre médecin pour tout problème que vous pourriez rencontrer. Vous pouvez toujours traiter les symptômes à tout moment. ',
  },
  TODAY: {
    headerInfo: 'Vérifiez les médicaments à prendre maintenant.',
    title: `Pas de médicaments aujourd'hui!`,
    info: 'Vérifiez auprès de votre médecin si vous devez poursuivre votre traitement. ',
    question: 'Voulez-vous vérifier vos symptômes maintenant?',
    confirm: 'Confirmez votre prise de médicaments',
    heading: 'Médicaments du jour',
  },
  MSG: {
    placeholder: 'tapez un message pour votre médecin ...',
    input: `qu'est-ce qui ne va pas?`,
    send: 'Envoyer un message',
  },
  SYM: {
    title: 'Vérification terminée!',
    info:
      'Vos symptômes sont maintenant envoyés au médecin. Restez calme et poursuivez votre module clinique. ',
    notFound: 'Aucun symptôme trouvé!',
    contactMD: 'Veuillez contacter votre médecin pour un nouveau module clinique.',
  },
  SRV: {
    retake: 'Reprendre le Test',
    start: 'Démarrer le Test',
    notFound: 'Aucune sondage trouvée!',
    noSurvey: 'Ce module clinique ne contient aucune sondage.',
    success: `Merci d'avoir passé ce test aujourd'hui.\nVotre dernier score est %{score}.\nVous pouvez repasser le test à tout moment.`,
    done: `Vous obtenez %{lastScore} lors de votre dernier test le %{lastDate}.
Vous pouvez vérifier vos résultats passés en appuyant sur le bouton en haut à droite.
Vous pouvez passer un nouveau test à partir du %{plus tard}. Si vous sentez qu'un
changement s'est produit au cours des dernières semaines, vous pouvez le reprendre maintenant.`,
    total: 'Total score',
  },
  SET: {
    switchLang: 'Switch to English',
    clinicalModules: 'Module Clinique',
    surveyResults: 'Résultats de le sondage',
    aboutApp: `À propos de l'application`,
    deleteData: 'Supprimer tout les données',
    moduleCode: 'Code du module clinique',
    apiEndpoint: 'API endpoint',
    deepLink: 'Lien profond',
    updateID: `Mise à jour de l'ID`,
    pushToken: 'Jeton de la notification',
    testPush: 'Tester les notifications locales',
    version: 'Version: %{version}',
  },
}
