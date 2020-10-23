export type AllKeys = "hi" | "coolest" | "greatest" | "discount";


export type GetTranslationTextType<T> = 
T extends "hi" ? never :
T extends "coolest" ? never :
T extends "greatest" ? never :
T extends "discount" ? { name: string,discount: string } :
never;