export const asianodeFaqs = [
  {
    title: 'Which brands does Asianode work with?',
    description:
      'Asianode works with brands looking to enter, strengthen, or activate their presence in Türkiye through locally grounded growth initiatives.',
  },
  {
    title: 'Can Asianode support both creator marketing and commercial channels?',
    description:
      'Yes. Asianode connects creator partnerships, content, paid-media optimisation, online commerce direction, and offline channel activity.',
  },
  {
    title: 'Do you support market entry as well as existing operations?',
    description:
      'Yes. Asianode can support brands preparing to enter Türkiye and those seeking to strengthen an established local presence.',
  },
  {
    title: 'Can Asianode work alongside our current agencies and teams?',
    description:
      'Yes. Asianode can work as a locally connected partner alongside internal teams, agencies, creators, and channel partners.',
  },
  {
    title: 'How do we start?',
    description:
      'Start by sharing your category, target audience, current market position, desired outcome, and timeline. Asianode will help identify the most useful next step.',
  },
] as const;

export const asianodeKnowledgeBase = asianodeFaqs
  .map((item) => `Q: ${item.title}\nA: ${item.description}`)
  .join('\n\n');
