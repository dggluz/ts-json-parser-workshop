class ToDoError extends Error {
  constructor(message: string, stack: string | undefined) {
    super(`ToDo: ${message}`);

    // Show original place where the ToDo function is called
    if (stack) {
      console.log(this.stack);
      const stackChunks = stack.split(' at ');

      this.stack = [
        ...stackChunks.slice(0, 1),
        ...stackChunks.slice(2),
      ].join(' at ');
    }
  }
}

export const ToDo = (message: string) => {
  try {
    throw new Error('Dummy Error');
  } catch (e) {
    return (...args: any[]): any => {
      const stack = e instanceof Error ? e.stack : '';
      throw new ToDoError(message, stack);
    };
  }
};
