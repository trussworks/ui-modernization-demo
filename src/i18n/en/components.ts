export default {
  banner: {
    header: {
      flagImg: {
        alt: 'U.S. flag',
      },
      text: 'This is an official website of $t(pages:global.stateOrTerritory)',
      actionText: "Here's how you know",
    },
    content: {
      dotGov: {
        icon: {
          alt: '',
        },
        explanation: {
          title: 'Official websites use .gov',
          text: 'A <strong>.gov</strong> website belongs to an official government organization in the United States.',
        },
      },
      https: {
        icon: {
          alt: '',
        },
        lockIcon: {
          title: 'Lock',
          description: 'A locked padlock',
        },
        explanation: {
          title: 'Secure .gov websites use HTTPS',
          text: "A <strong>lock ( <0>lock</0> )</strong> or <strong>https://</strong> means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.",
        },
      },
    },
  },
  dropdownField: {
    select: '- Select -',
  },
  footer: {
    returnTop: 'Return to top',
    identifierAria: 'Agency identifier',
    official: 'An official website of <0>$t(pages:global.stateOrTerritory)</0>',
    links: 'Important links',
    link1: 'Link 1',
    link2: 'Link 2',
    link3: 'Link 3',
    home: 'Home',
    govAria: 'U.S. government information and services',
    copyright: 'Copyright © 2023 $t(pages:global.stateOrTerritory)',
  },
  header: {
    title: 'Unemployment Insurance Benefits',
    navMenu: {
      button: 'Menu',
      items: {
        home: 'Home',
        claim: 'My claim',
        logOut: 'Log out',
      },
    },
  },
  importedInputBox: {
    heading: 'The following information has been added to your application:',
  },
  yesNoQuestion: {
    yes: 'Yes',
    no: 'No',
  },
  dateInput: {
    day: {
      label: 'Day',
      errors: {
        required: 'Day is required',
      },
    },
    month: {
      label: 'Month',
      errors: {
        required: 'Month is required',
      },
    },
    year: {
      label: 'Year',
      errors: {
        required: 'Year is required',
      },
    },
    errors: {
      invalid: 'Date is invalid',
    },
  },
}
