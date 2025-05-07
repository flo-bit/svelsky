export type UpdateFunction = () => boolean | Promise<boolean>;

export type UpdateRecordFunction = () => Record<string, any> | Promise<Record<string, any>>;