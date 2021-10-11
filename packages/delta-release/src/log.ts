import colors from 'colors/safe';

export const log = (level: 'info' | 'error' | 'command', message: string) => {
  const color = {
    info: 'cyan',
    command: 'green',
    error: 'red'
  }[level];
  console.log(colors[color](`[${level}] `) + message);
};
