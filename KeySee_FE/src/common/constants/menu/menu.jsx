export const MENU = {
  M1: {
    id: 'M1',
    name: 'menu',
    description: 'Main menu',
    path: '/',
    1: {
      id: 'M11',
      name: 'File management',
      path: '/',
      description: 'redirect to [File management] screen'
    },
    2: {
      id: 'M12',
      name: 'Update to latest information',
      path: '/refresh-screen',
      description: 'refresh screen'
    },
    3: {
      id: 'M13',
      name: 'Output',
      description: 'N/A',
      path: '/',
      1: {
        id: 'M131',
        name: 'Invoice',
        path: '/',
        description: 'invoice printing'
      },
      2: {
        id: 'M132',
        name: 'Transfer slip',
        path: '/',
        description:
          'export invoice requesting payment [CSV File] with records with check in checkbox of invoice request for payment'
      },
    },
    4: {
      id: 'M14',
      name: 'Custom list',
      path: '/',
      description: 'Item to select Pattern selection in the Custom list screen'
    }
  },
  M2: {
    id: 'M2',
    name: 'Screen movement',
    description: 'Main menu',
    path: '/',
    1: {
      id: 'M21',
      name: 'Go back one screen',
      path: '/',
      description: 'N/A'
    },
    2: {
      id: 'M22',
      name: 'Functions list',
      path: '/',
      description: ' redirect to [Functions list]',
      isEndSection: true
    },
    3: {
      id: 'M23',
      name: 'Property ledger',
      path: '/',
      description: ' redirect to [Property ledger]',
      isEndSection: true
    },
  }
}
