function asciiStart() {
  return `
              (o_O)   ___
                |==__/__/
               / \\ 

     || Prime Finder Initiated! ||
`;
}

function asciiSuccess() {
  return `
            (^_^)      ___
           ╰⏜-|-⏜╯ __/__/
            _/ \\_ 

    || Congrats Hacker Man! ||
`;
}

function asciiFailure() {
  return `
        (╯°□°）╯︵ ┻━┻
           |
          / \\ 

|| You have failed this city! ||
`;
}

module.exports = {
  asciiStart,
  asciiSuccess,
  asciiFailure,
};