import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Subject: "Subject";
    readonly Activity: "Activity";
    readonly PlannerBlock: "PlannerBlock";
    readonly PomodoroSession: "PomodoroSession";
    readonly Flashcard: "Flashcard";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SubjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly color: "color";
    readonly category: "category";
    readonly icon: "icon";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum];
export declare const ActivityScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly dueDate: "dueDate";
    readonly status: "status";
    readonly type: "type";
    readonly priority: "priority";
    readonly subjectId: "subjectId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum];
export declare const PlannerBlockScalarFieldEnum: {
    readonly id: "id";
    readonly dayOfWeek: "dayOfWeek";
    readonly durationMinutes: "durationMinutes";
    readonly subjectId: "subjectId";
    readonly userId: "userId";
};
export type PlannerBlockScalarFieldEnum = (typeof PlannerBlockScalarFieldEnum)[keyof typeof PlannerBlockScalarFieldEnum];
export declare const PomodoroSessionScalarFieldEnum: {
    readonly id: "id";
    readonly durationMinutes: "durationMinutes";
    readonly completedAt: "completedAt";
    readonly subjectId: "subjectId";
    readonly userId: "userId";
};
export type PomodoroSessionScalarFieldEnum = (typeof PomodoroSessionScalarFieldEnum)[keyof typeof PomodoroSessionScalarFieldEnum];
export declare const FlashcardScalarFieldEnum: {
    readonly id: "id";
    readonly front: "front";
    readonly back: "back";
    readonly intervalDays: "intervalDays";
    readonly easeFactor: "easeFactor";
    readonly repetitions: "repetitions";
    readonly nextReview: "nextReview";
    readonly subjectId: "subjectId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FlashcardScalarFieldEnum = (typeof FlashcardScalarFieldEnum)[keyof typeof FlashcardScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map