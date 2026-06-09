import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Subject
 *
 */
export type SubjectModel = runtime.Types.Result.DefaultSelection<Prisma.$SubjectPayload>;
export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null;
    _min: SubjectMinAggregateOutputType | null;
    _max: SubjectMaxAggregateOutputType | null;
};
export type SubjectMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    color: string | null;
    category: string | null;
    icon: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type SubjectMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    color: string | null;
    category: string | null;
    icon: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type SubjectCountAggregateOutputType = {
    id: number;
    name: number;
    color: number;
    category: number;
    icon: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type SubjectMinAggregateInputType = {
    id?: true;
    name?: true;
    color?: true;
    category?: true;
    icon?: true;
    userId?: true;
    createdAt?: true;
};
export type SubjectMaxAggregateInputType = {
    id?: true;
    name?: true;
    color?: true;
    category?: true;
    icon?: true;
    userId?: true;
    createdAt?: true;
};
export type SubjectCountAggregateInputType = {
    id?: true;
    name?: true;
    color?: true;
    category?: true;
    icon?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type SubjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType;
};
export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
    [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubject[P]> : Prisma.GetScalarType<T[P], AggregateSubject[P]>;
};
export type SubjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubjectWhereInput;
    orderBy?: Prisma.SubjectOrderByWithAggregationInput | Prisma.SubjectOrderByWithAggregationInput[];
    by: Prisma.SubjectScalarFieldEnum[] | Prisma.SubjectScalarFieldEnum;
    having?: Prisma.SubjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubjectCountAggregateInputType | true;
    _min?: SubjectMinAggregateInputType;
    _max?: SubjectMaxAggregateInputType;
};
export type SubjectGroupByOutputType = {
    id: string;
    name: string;
    color: string;
    category: string | null;
    icon: string | null;
    userId: string;
    createdAt: Date;
    _count: SubjectCountAggregateOutputType | null;
    _min: SubjectMinAggregateOutputType | null;
    _max: SubjectMaxAggregateOutputType | null;
};
export type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubjectGroupByOutputType[P]>;
}>>;
export type SubjectWhereInput = {
    AND?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    OR?: Prisma.SubjectWhereInput[];
    NOT?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    id?: Prisma.StringFilter<"Subject"> | string;
    name?: Prisma.StringFilter<"Subject"> | string;
    color?: Prisma.StringFilter<"Subject"> | string;
    category?: Prisma.StringNullableFilter<"Subject"> | string | null;
    icon?: Prisma.StringNullableFilter<"Subject"> | string | null;
    userId?: Prisma.StringFilter<"Subject"> | string;
    createdAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    activities?: Prisma.ActivityListRelationFilter;
    plannerBlocks?: Prisma.PlannerBlockListRelationFilter;
    pomodoroSessions?: Prisma.PomodoroSessionListRelationFilter;
};
export type SubjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    activities?: Prisma.ActivityOrderByRelationAggregateInput;
    plannerBlocks?: Prisma.PlannerBlockOrderByRelationAggregateInput;
    pomodoroSessions?: Prisma.PomodoroSessionOrderByRelationAggregateInput;
};
export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    OR?: Prisma.SubjectWhereInput[];
    NOT?: Prisma.SubjectWhereInput | Prisma.SubjectWhereInput[];
    name?: Prisma.StringFilter<"Subject"> | string;
    color?: Prisma.StringFilter<"Subject"> | string;
    category?: Prisma.StringNullableFilter<"Subject"> | string | null;
    icon?: Prisma.StringNullableFilter<"Subject"> | string | null;
    userId?: Prisma.StringFilter<"Subject"> | string;
    createdAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    activities?: Prisma.ActivityListRelationFilter;
    plannerBlocks?: Prisma.PlannerBlockListRelationFilter;
    pomodoroSessions?: Prisma.PomodoroSessionListRelationFilter;
}, "id">;
export type SubjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SubjectCountOrderByAggregateInput;
    _max?: Prisma.SubjectMaxOrderByAggregateInput;
    _min?: Prisma.SubjectMinOrderByAggregateInput;
};
export type SubjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.SubjectScalarWhereWithAggregatesInput | Prisma.SubjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.SubjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SubjectScalarWhereWithAggregatesInput | Prisma.SubjectScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Subject"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Subject"> | string;
    color?: Prisma.StringWithAggregatesFilter<"Subject"> | string;
    category?: Prisma.StringNullableWithAggregatesFilter<"Subject"> | string | null;
    icon?: Prisma.StringNullableWithAggregatesFilter<"Subject"> | string | null;
    userId?: Prisma.StringWithAggregatesFilter<"Subject"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Subject"> | Date | string;
};
export type SubjectCreateInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSubjectsInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutSubjectInput;
    plannerBlocks?: Prisma.PlannerBlockCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    userId: string;
    createdAt?: Date | string;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutSubjectInput;
    plannerBlocks?: Prisma.PlannerBlockUncheckedCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSubjectsNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutSubjectNestedInput;
    plannerBlocks?: Prisma.PlannerBlockUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutSubjectNestedInput;
    plannerBlocks?: Prisma.PlannerBlockUncheckedUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateManyInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    userId: string;
    createdAt?: Date | string;
};
export type SubjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubjectListRelationFilter = {
    every?: Prisma.SubjectWhereInput;
    some?: Prisma.SubjectWhereInput;
    none?: Prisma.SubjectWhereInput;
};
export type SubjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SubjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubjectScalarRelationFilter = {
    is?: Prisma.SubjectWhereInput;
    isNot?: Prisma.SubjectWhereInput;
};
export type SubjectCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutUserInput, Prisma.SubjectUncheckedCreateWithoutUserInput> | Prisma.SubjectCreateWithoutUserInput[] | Prisma.SubjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutUserInput | Prisma.SubjectCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SubjectCreateManyUserInputEnvelope;
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
};
export type SubjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutUserInput, Prisma.SubjectUncheckedCreateWithoutUserInput> | Prisma.SubjectCreateWithoutUserInput[] | Prisma.SubjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutUserInput | Prisma.SubjectCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SubjectCreateManyUserInputEnvelope;
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
};
export type SubjectUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutUserInput, Prisma.SubjectUncheckedCreateWithoutUserInput> | Prisma.SubjectCreateWithoutUserInput[] | Prisma.SubjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutUserInput | Prisma.SubjectCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SubjectUpsertWithWhereUniqueWithoutUserInput | Prisma.SubjectUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SubjectCreateManyUserInputEnvelope;
    set?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    disconnect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    delete?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    update?: Prisma.SubjectUpdateWithWhereUniqueWithoutUserInput | Prisma.SubjectUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SubjectUpdateManyWithWhereWithoutUserInput | Prisma.SubjectUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
};
export type SubjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutUserInput, Prisma.SubjectUncheckedCreateWithoutUserInput> | Prisma.SubjectCreateWithoutUserInput[] | Prisma.SubjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutUserInput | Prisma.SubjectCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SubjectUpsertWithWhereUniqueWithoutUserInput | Prisma.SubjectUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SubjectCreateManyUserInputEnvelope;
    set?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    disconnect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    delete?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    connect?: Prisma.SubjectWhereUniqueInput | Prisma.SubjectWhereUniqueInput[];
    update?: Prisma.SubjectUpdateWithWhereUniqueWithoutUserInput | Prisma.SubjectUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SubjectUpdateManyWithWhereWithoutUserInput | Prisma.SubjectUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type SubjectCreateNestedOneWithoutActivitiesInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutActivitiesInput, Prisma.SubjectUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutActivitiesInput;
    connect?: Prisma.SubjectWhereUniqueInput;
};
export type SubjectUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutActivitiesInput, Prisma.SubjectUncheckedCreateWithoutActivitiesInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutActivitiesInput;
    upsert?: Prisma.SubjectUpsertWithoutActivitiesInput;
    connect?: Prisma.SubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubjectUpdateToOneWithWhereWithoutActivitiesInput, Prisma.SubjectUpdateWithoutActivitiesInput>, Prisma.SubjectUncheckedUpdateWithoutActivitiesInput>;
};
export type SubjectCreateNestedOneWithoutPlannerBlocksInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutPlannerBlocksInput, Prisma.SubjectUncheckedCreateWithoutPlannerBlocksInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutPlannerBlocksInput;
    connect?: Prisma.SubjectWhereUniqueInput;
};
export type SubjectUpdateOneRequiredWithoutPlannerBlocksNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutPlannerBlocksInput, Prisma.SubjectUncheckedCreateWithoutPlannerBlocksInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutPlannerBlocksInput;
    upsert?: Prisma.SubjectUpsertWithoutPlannerBlocksInput;
    connect?: Prisma.SubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubjectUpdateToOneWithWhereWithoutPlannerBlocksInput, Prisma.SubjectUpdateWithoutPlannerBlocksInput>, Prisma.SubjectUncheckedUpdateWithoutPlannerBlocksInput>;
};
export type SubjectCreateNestedOneWithoutPomodoroSessionsInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutPomodoroSessionsInput, Prisma.SubjectUncheckedCreateWithoutPomodoroSessionsInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutPomodoroSessionsInput;
    connect?: Prisma.SubjectWhereUniqueInput;
};
export type SubjectUpdateOneRequiredWithoutPomodoroSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.SubjectCreateWithoutPomodoroSessionsInput, Prisma.SubjectUncheckedCreateWithoutPomodoroSessionsInput>;
    connectOrCreate?: Prisma.SubjectCreateOrConnectWithoutPomodoroSessionsInput;
    upsert?: Prisma.SubjectUpsertWithoutPomodoroSessionsInput;
    connect?: Prisma.SubjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubjectUpdateToOneWithWhereWithoutPomodoroSessionsInput, Prisma.SubjectUpdateWithoutPomodoroSessionsInput>, Prisma.SubjectUncheckedUpdateWithoutPomodoroSessionsInput>;
};
export type SubjectCreateWithoutUserInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    createdAt?: Date | string;
    activities?: Prisma.ActivityCreateNestedManyWithoutSubjectInput;
    plannerBlocks?: Prisma.PlannerBlockCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    createdAt?: Date | string;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutSubjectInput;
    plannerBlocks?: Prisma.PlannerBlockUncheckedCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutUserInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutUserInput, Prisma.SubjectUncheckedCreateWithoutUserInput>;
};
export type SubjectCreateManyUserInputEnvelope = {
    data: Prisma.SubjectCreateManyUserInput | Prisma.SubjectCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SubjectUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SubjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutUserInput, Prisma.SubjectUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutUserInput, Prisma.SubjectUncheckedCreateWithoutUserInput>;
};
export type SubjectUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SubjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutUserInput, Prisma.SubjectUncheckedUpdateWithoutUserInput>;
};
export type SubjectUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SubjectScalarWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateManyMutationInput, Prisma.SubjectUncheckedUpdateManyWithoutUserInput>;
};
export type SubjectScalarWhereInput = {
    AND?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
    OR?: Prisma.SubjectScalarWhereInput[];
    NOT?: Prisma.SubjectScalarWhereInput | Prisma.SubjectScalarWhereInput[];
    id?: Prisma.StringFilter<"Subject"> | string;
    name?: Prisma.StringFilter<"Subject"> | string;
    color?: Prisma.StringFilter<"Subject"> | string;
    category?: Prisma.StringNullableFilter<"Subject"> | string | null;
    icon?: Prisma.StringNullableFilter<"Subject"> | string | null;
    userId?: Prisma.StringFilter<"Subject"> | string;
    createdAt?: Prisma.DateTimeFilter<"Subject"> | Date | string;
};
export type SubjectCreateWithoutActivitiesInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSubjectsInput;
    plannerBlocks?: Prisma.PlannerBlockCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutActivitiesInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    userId: string;
    createdAt?: Date | string;
    plannerBlocks?: Prisma.PlannerBlockUncheckedCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutActivitiesInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutActivitiesInput, Prisma.SubjectUncheckedCreateWithoutActivitiesInput>;
};
export type SubjectUpsertWithoutActivitiesInput = {
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutActivitiesInput, Prisma.SubjectUncheckedUpdateWithoutActivitiesInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutActivitiesInput, Prisma.SubjectUncheckedCreateWithoutActivitiesInput>;
    where?: Prisma.SubjectWhereInput;
};
export type SubjectUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: Prisma.SubjectWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutActivitiesInput, Prisma.SubjectUncheckedUpdateWithoutActivitiesInput>;
};
export type SubjectUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSubjectsNestedInput;
    plannerBlocks?: Prisma.PlannerBlockUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutActivitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plannerBlocks?: Prisma.PlannerBlockUncheckedUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateWithoutPlannerBlocksInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSubjectsInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutPlannerBlocksInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    userId: string;
    createdAt?: Date | string;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutSubjectInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutPlannerBlocksInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutPlannerBlocksInput, Prisma.SubjectUncheckedCreateWithoutPlannerBlocksInput>;
};
export type SubjectUpsertWithoutPlannerBlocksInput = {
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutPlannerBlocksInput, Prisma.SubjectUncheckedUpdateWithoutPlannerBlocksInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutPlannerBlocksInput, Prisma.SubjectUncheckedCreateWithoutPlannerBlocksInput>;
    where?: Prisma.SubjectWhereInput;
};
export type SubjectUpdateToOneWithWhereWithoutPlannerBlocksInput = {
    where?: Prisma.SubjectWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutPlannerBlocksInput, Prisma.SubjectUncheckedUpdateWithoutPlannerBlocksInput>;
};
export type SubjectUpdateWithoutPlannerBlocksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSubjectsNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutPlannerBlocksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateWithoutPomodoroSessionsInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSubjectsInput;
    activities?: Prisma.ActivityCreateNestedManyWithoutSubjectInput;
    plannerBlocks?: Prisma.PlannerBlockCreateNestedManyWithoutSubjectInput;
};
export type SubjectUncheckedCreateWithoutPomodoroSessionsInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    userId: string;
    createdAt?: Date | string;
    activities?: Prisma.ActivityUncheckedCreateNestedManyWithoutSubjectInput;
    plannerBlocks?: Prisma.PlannerBlockUncheckedCreateNestedManyWithoutSubjectInput;
};
export type SubjectCreateOrConnectWithoutPomodoroSessionsInput = {
    where: Prisma.SubjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutPomodoroSessionsInput, Prisma.SubjectUncheckedCreateWithoutPomodoroSessionsInput>;
};
export type SubjectUpsertWithoutPomodoroSessionsInput = {
    update: Prisma.XOR<Prisma.SubjectUpdateWithoutPomodoroSessionsInput, Prisma.SubjectUncheckedUpdateWithoutPomodoroSessionsInput>;
    create: Prisma.XOR<Prisma.SubjectCreateWithoutPomodoroSessionsInput, Prisma.SubjectUncheckedCreateWithoutPomodoroSessionsInput>;
    where?: Prisma.SubjectWhereInput;
};
export type SubjectUpdateToOneWithWhereWithoutPomodoroSessionsInput = {
    where?: Prisma.SubjectWhereInput;
    data: Prisma.XOR<Prisma.SubjectUpdateWithoutPomodoroSessionsInput, Prisma.SubjectUncheckedUpdateWithoutPomodoroSessionsInput>;
};
export type SubjectUpdateWithoutPomodoroSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSubjectsNestedInput;
    activities?: Prisma.ActivityUpdateManyWithoutSubjectNestedInput;
    plannerBlocks?: Prisma.PlannerBlockUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutPomodoroSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutSubjectNestedInput;
    plannerBlocks?: Prisma.PlannerBlockUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectCreateManyUserInput = {
    id?: string;
    name: string;
    color: string;
    category?: string | null;
    icon?: string | null;
    createdAt?: Date | string;
};
export type SubjectUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.ActivityUpdateManyWithoutSubjectNestedInput;
    plannerBlocks?: Prisma.PlannerBlockUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activities?: Prisma.ActivityUncheckedUpdateManyWithoutSubjectNestedInput;
    plannerBlocks?: Prisma.PlannerBlockUncheckedUpdateManyWithoutSubjectNestedInput;
    pomodoroSessions?: Prisma.PomodoroSessionUncheckedUpdateManyWithoutSubjectNestedInput;
};
export type SubjectUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type SubjectCountOutputType
 */
export type SubjectCountOutputType = {
    activities: number;
    plannerBlocks: number;
    pomodoroSessions: number;
};
export type SubjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    activities?: boolean | SubjectCountOutputTypeCountActivitiesArgs;
    plannerBlocks?: boolean | SubjectCountOutputTypeCountPlannerBlocksArgs;
    pomodoroSessions?: boolean | SubjectCountOutputTypeCountPomodoroSessionsArgs;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: Prisma.SubjectCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeCountActivitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityWhereInput;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeCountPlannerBlocksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlannerBlockWhereInput;
};
/**
 * SubjectCountOutputType without action
 */
export type SubjectCountOutputTypeCountPomodoroSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PomodoroSessionWhereInput;
};
export type SubjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    color?: boolean;
    category?: boolean;
    icon?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    activities?: boolean | Prisma.Subject$activitiesArgs<ExtArgs>;
    plannerBlocks?: boolean | Prisma.Subject$plannerBlocksArgs<ExtArgs>;
    pomodoroSessions?: boolean | Prisma.Subject$pomodoroSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subject"]>;
export type SubjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    color?: boolean;
    category?: boolean;
    icon?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subject"]>;
export type SubjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    color?: boolean;
    category?: boolean;
    icon?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subject"]>;
export type SubjectSelectScalar = {
    id?: boolean;
    name?: boolean;
    color?: boolean;
    category?: boolean;
    icon?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type SubjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "color" | "category" | "icon" | "userId" | "createdAt", ExtArgs["result"]["subject"]>;
export type SubjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    activities?: boolean | Prisma.Subject$activitiesArgs<ExtArgs>;
    plannerBlocks?: boolean | Prisma.Subject$plannerBlocksArgs<ExtArgs>;
    pomodoroSessions?: boolean | Prisma.Subject$pomodoroSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SubjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $SubjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Subject";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        activities: Prisma.$ActivityPayload<ExtArgs>[];
        plannerBlocks: Prisma.$PlannerBlockPayload<ExtArgs>[];
        pomodoroSessions: Prisma.$PomodoroSessionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        color: string;
        category: string | null;
        icon: string | null;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["subject"]>;
    composites: {};
};
export type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SubjectPayload, S>;
export type SubjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubjectCountAggregateInputType | true;
};
export interface SubjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Subject'];
        meta: {
            name: 'Subject';
        };
    };
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: Prisma.SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: Prisma.SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     *
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SubjectFindManyArgs>(args?: Prisma.SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     *
     */
    create<T extends SubjectCreateArgs>(args: Prisma.SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SubjectCreateManyArgs>(args?: Prisma.SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     *
     */
    delete<T extends SubjectDeleteArgs>(args: Prisma.SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SubjectUpdateArgs>(args: Prisma.SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: Prisma.SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: Prisma.SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(args?: Prisma.Subset<T, SubjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubjectCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Prisma.Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>;
    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends SubjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SubjectGroupByArgs['orderBy'];
    } : {
        orderBy?: SubjectGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Subject model
     */
    readonly fields: SubjectFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Subject.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    activities<T extends Prisma.Subject$activitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    plannerBlocks<T extends Prisma.Subject$plannerBlocksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$plannerBlocksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pomodoroSessions<T extends Prisma.Subject$pomodoroSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subject$pomodoroSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PomodoroSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Subject model
 */
export interface SubjectFieldRefs {
    readonly id: Prisma.FieldRef<"Subject", 'String'>;
    readonly name: Prisma.FieldRef<"Subject", 'String'>;
    readonly color: Prisma.FieldRef<"Subject", 'String'>;
    readonly category: Prisma.FieldRef<"Subject", 'String'>;
    readonly icon: Prisma.FieldRef<"Subject", 'String'>;
    readonly userId: Prisma.FieldRef<"Subject", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Subject", 'DateTime'>;
}
/**
 * Subject findUnique
 */
export type SubjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject findUniqueOrThrow
 */
export type SubjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject findFirst
 */
export type SubjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subjects.
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subjects.
     */
    distinct?: Prisma.SubjectScalarFieldEnum | Prisma.SubjectScalarFieldEnum[];
};
/**
 * Subject findFirstOrThrow
 */
export type SubjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subject to fetch.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Subjects.
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subjects.
     */
    distinct?: Prisma.SubjectScalarFieldEnum | Prisma.SubjectScalarFieldEnum[];
};
/**
 * Subject findMany
 */
export type SubjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter, which Subjects to fetch.
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Subjects to fetch.
     */
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Subjects.
     */
    cursor?: Prisma.SubjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Subjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Subjects.
     */
    distinct?: Prisma.SubjectScalarFieldEnum | Prisma.SubjectScalarFieldEnum[];
};
/**
 * Subject create
 */
export type SubjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * The data needed to create a Subject.
     */
    data: Prisma.XOR<Prisma.SubjectCreateInput, Prisma.SubjectUncheckedCreateInput>;
};
/**
 * Subject createMany
 */
export type SubjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: Prisma.SubjectCreateManyInput | Prisma.SubjectCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Subject createManyAndReturn
 */
export type SubjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * The data used to create many Subjects.
     */
    data: Prisma.SubjectCreateManyInput | Prisma.SubjectCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Subject update
 */
export type SubjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * The data needed to update a Subject.
     */
    data: Prisma.XOR<Prisma.SubjectUpdateInput, Prisma.SubjectUncheckedUpdateInput>;
    /**
     * Choose, which Subject to update.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject updateMany
 */
export type SubjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: Prisma.XOR<Prisma.SubjectUpdateManyMutationInput, Prisma.SubjectUncheckedUpdateManyInput>;
    /**
     * Filter which Subjects to update
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * Limit how many Subjects to update.
     */
    limit?: number;
};
/**
 * Subject updateManyAndReturn
 */
export type SubjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * The data used to update Subjects.
     */
    data: Prisma.XOR<Prisma.SubjectUpdateManyMutationInput, Prisma.SubjectUncheckedUpdateManyInput>;
    /**
     * Filter which Subjects to update
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * Limit how many Subjects to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Subject upsert
 */
export type SubjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: Prisma.SubjectWhereUniqueInput;
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: Prisma.XOR<Prisma.SubjectCreateInput, Prisma.SubjectUncheckedCreateInput>;
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SubjectUpdateInput, Prisma.SubjectUncheckedUpdateInput>;
};
/**
 * Subject delete
 */
export type SubjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    /**
     * Filter which Subject to delete.
     */
    where: Prisma.SubjectWhereUniqueInput;
};
/**
 * Subject deleteMany
 */
export type SubjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: Prisma.SubjectWhereInput;
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number;
};
/**
 * Subject.activities
 */
export type Subject$activitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: Prisma.ActivitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Activity
     */
    omit?: Prisma.ActivityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ActivityInclude<ExtArgs> | null;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput | Prisma.ActivityOrderByWithRelationInput[];
    cursor?: Prisma.ActivityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ActivityScalarFieldEnum | Prisma.ActivityScalarFieldEnum[];
};
/**
 * Subject.plannerBlocks
 */
export type Subject$plannerBlocksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlannerBlock
     */
    select?: Prisma.PlannerBlockSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PlannerBlock
     */
    omit?: Prisma.PlannerBlockOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PlannerBlockInclude<ExtArgs> | null;
    where?: Prisma.PlannerBlockWhereInput;
    orderBy?: Prisma.PlannerBlockOrderByWithRelationInput | Prisma.PlannerBlockOrderByWithRelationInput[];
    cursor?: Prisma.PlannerBlockWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PlannerBlockScalarFieldEnum | Prisma.PlannerBlockScalarFieldEnum[];
};
/**
 * Subject.pomodoroSessions
 */
export type Subject$pomodoroSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PomodoroSession
     */
    select?: Prisma.PomodoroSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PomodoroSession
     */
    omit?: Prisma.PomodoroSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PomodoroSessionInclude<ExtArgs> | null;
    where?: Prisma.PomodoroSessionWhereInput;
    orderBy?: Prisma.PomodoroSessionOrderByWithRelationInput | Prisma.PomodoroSessionOrderByWithRelationInput[];
    cursor?: Prisma.PomodoroSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PomodoroSessionScalarFieldEnum | Prisma.PomodoroSessionScalarFieldEnum[];
};
/**
 * Subject without action
 */
export type SubjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
};
//# sourceMappingURL=Subject.d.ts.map