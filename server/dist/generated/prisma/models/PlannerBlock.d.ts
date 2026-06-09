import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PlannerBlock
 *
 */
export type PlannerBlockModel = runtime.Types.Result.DefaultSelection<Prisma.$PlannerBlockPayload>;
export type AggregatePlannerBlock = {
    _count: PlannerBlockCountAggregateOutputType | null;
    _avg: PlannerBlockAvgAggregateOutputType | null;
    _sum: PlannerBlockSumAggregateOutputType | null;
    _min: PlannerBlockMinAggregateOutputType | null;
    _max: PlannerBlockMaxAggregateOutputType | null;
};
export type PlannerBlockAvgAggregateOutputType = {
    dayOfWeek: number | null;
    durationMinutes: number | null;
};
export type PlannerBlockSumAggregateOutputType = {
    dayOfWeek: number | null;
    durationMinutes: number | null;
};
export type PlannerBlockMinAggregateOutputType = {
    id: string | null;
    dayOfWeek: number | null;
    durationMinutes: number | null;
    subjectId: string | null;
    userId: string | null;
};
export type PlannerBlockMaxAggregateOutputType = {
    id: string | null;
    dayOfWeek: number | null;
    durationMinutes: number | null;
    subjectId: string | null;
    userId: string | null;
};
export type PlannerBlockCountAggregateOutputType = {
    id: number;
    dayOfWeek: number;
    durationMinutes: number;
    subjectId: number;
    userId: number;
    _all: number;
};
export type PlannerBlockAvgAggregateInputType = {
    dayOfWeek?: true;
    durationMinutes?: true;
};
export type PlannerBlockSumAggregateInputType = {
    dayOfWeek?: true;
    durationMinutes?: true;
};
export type PlannerBlockMinAggregateInputType = {
    id?: true;
    dayOfWeek?: true;
    durationMinutes?: true;
    subjectId?: true;
    userId?: true;
};
export type PlannerBlockMaxAggregateInputType = {
    id?: true;
    dayOfWeek?: true;
    durationMinutes?: true;
    subjectId?: true;
    userId?: true;
};
export type PlannerBlockCountAggregateInputType = {
    id?: true;
    dayOfWeek?: true;
    durationMinutes?: true;
    subjectId?: true;
    userId?: true;
    _all?: true;
};
export type PlannerBlockAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PlannerBlock to aggregate.
     */
    where?: Prisma.PlannerBlockWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlannerBlocks to fetch.
     */
    orderBy?: Prisma.PlannerBlockOrderByWithRelationInput | Prisma.PlannerBlockOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PlannerBlockWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlannerBlocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlannerBlocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PlannerBlocks
    **/
    _count?: true | PlannerBlockCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PlannerBlockAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PlannerBlockSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PlannerBlockMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PlannerBlockMaxAggregateInputType;
};
export type GetPlannerBlockAggregateType<T extends PlannerBlockAggregateArgs> = {
    [P in keyof T & keyof AggregatePlannerBlock]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlannerBlock[P]> : Prisma.GetScalarType<T[P], AggregatePlannerBlock[P]>;
};
export type PlannerBlockGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PlannerBlockWhereInput;
    orderBy?: Prisma.PlannerBlockOrderByWithAggregationInput | Prisma.PlannerBlockOrderByWithAggregationInput[];
    by: Prisma.PlannerBlockScalarFieldEnum[] | Prisma.PlannerBlockScalarFieldEnum;
    having?: Prisma.PlannerBlockScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PlannerBlockCountAggregateInputType | true;
    _avg?: PlannerBlockAvgAggregateInputType;
    _sum?: PlannerBlockSumAggregateInputType;
    _min?: PlannerBlockMinAggregateInputType;
    _max?: PlannerBlockMaxAggregateInputType;
};
export type PlannerBlockGroupByOutputType = {
    id: string;
    dayOfWeek: number;
    durationMinutes: number;
    subjectId: string;
    userId: string;
    _count: PlannerBlockCountAggregateOutputType | null;
    _avg: PlannerBlockAvgAggregateOutputType | null;
    _sum: PlannerBlockSumAggregateOutputType | null;
    _min: PlannerBlockMinAggregateOutputType | null;
    _max: PlannerBlockMaxAggregateOutputType | null;
};
export type GetPlannerBlockGroupByPayload<T extends PlannerBlockGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PlannerBlockGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PlannerBlockGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PlannerBlockGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PlannerBlockGroupByOutputType[P]>;
}>>;
export type PlannerBlockWhereInput = {
    AND?: Prisma.PlannerBlockWhereInput | Prisma.PlannerBlockWhereInput[];
    OR?: Prisma.PlannerBlockWhereInput[];
    NOT?: Prisma.PlannerBlockWhereInput | Prisma.PlannerBlockWhereInput[];
    id?: Prisma.StringFilter<"PlannerBlock"> | string;
    dayOfWeek?: Prisma.IntFilter<"PlannerBlock"> | number;
    durationMinutes?: Prisma.IntFilter<"PlannerBlock"> | number;
    subjectId?: Prisma.StringFilter<"PlannerBlock"> | string;
    userId?: Prisma.StringFilter<"PlannerBlock"> | string;
    subject?: Prisma.XOR<Prisma.SubjectScalarRelationFilter, Prisma.SubjectWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PlannerBlockOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    durationMinutes?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    subject?: Prisma.SubjectOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PlannerBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PlannerBlockWhereInput | Prisma.PlannerBlockWhereInput[];
    OR?: Prisma.PlannerBlockWhereInput[];
    NOT?: Prisma.PlannerBlockWhereInput | Prisma.PlannerBlockWhereInput[];
    dayOfWeek?: Prisma.IntFilter<"PlannerBlock"> | number;
    durationMinutes?: Prisma.IntFilter<"PlannerBlock"> | number;
    subjectId?: Prisma.StringFilter<"PlannerBlock"> | string;
    userId?: Prisma.StringFilter<"PlannerBlock"> | string;
    subject?: Prisma.XOR<Prisma.SubjectScalarRelationFilter, Prisma.SubjectWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type PlannerBlockOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    durationMinutes?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    _count?: Prisma.PlannerBlockCountOrderByAggregateInput;
    _avg?: Prisma.PlannerBlockAvgOrderByAggregateInput;
    _max?: Prisma.PlannerBlockMaxOrderByAggregateInput;
    _min?: Prisma.PlannerBlockMinOrderByAggregateInput;
    _sum?: Prisma.PlannerBlockSumOrderByAggregateInput;
};
export type PlannerBlockScalarWhereWithAggregatesInput = {
    AND?: Prisma.PlannerBlockScalarWhereWithAggregatesInput | Prisma.PlannerBlockScalarWhereWithAggregatesInput[];
    OR?: Prisma.PlannerBlockScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PlannerBlockScalarWhereWithAggregatesInput | Prisma.PlannerBlockScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PlannerBlock"> | string;
    dayOfWeek?: Prisma.IntWithAggregatesFilter<"PlannerBlock"> | number;
    durationMinutes?: Prisma.IntWithAggregatesFilter<"PlannerBlock"> | number;
    subjectId?: Prisma.StringWithAggregatesFilter<"PlannerBlock"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PlannerBlock"> | string;
};
export type PlannerBlockCreateInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    subject: Prisma.SubjectCreateNestedOneWithoutPlannerBlocksInput;
    user: Prisma.UserCreateNestedOneWithoutPlannerBlocksInput;
};
export type PlannerBlockUncheckedCreateInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    subjectId: string;
    userId: string;
};
export type PlannerBlockUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutPlannerBlocksNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPlannerBlocksNestedInput;
};
export type PlannerBlockUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlannerBlockCreateManyInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    subjectId: string;
    userId: string;
};
export type PlannerBlockUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PlannerBlockUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlannerBlockListRelationFilter = {
    every?: Prisma.PlannerBlockWhereInput;
    some?: Prisma.PlannerBlockWhereInput;
    none?: Prisma.PlannerBlockWhereInput;
};
export type PlannerBlockOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PlannerBlockCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    durationMinutes?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PlannerBlockAvgOrderByAggregateInput = {
    dayOfWeek?: Prisma.SortOrder;
    durationMinutes?: Prisma.SortOrder;
};
export type PlannerBlockMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    durationMinutes?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PlannerBlockMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    durationMinutes?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type PlannerBlockSumOrderByAggregateInput = {
    dayOfWeek?: Prisma.SortOrder;
    durationMinutes?: Prisma.SortOrder;
};
export type PlannerBlockCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutUserInput, Prisma.PlannerBlockUncheckedCreateWithoutUserInput> | Prisma.PlannerBlockCreateWithoutUserInput[] | Prisma.PlannerBlockUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutUserInput | Prisma.PlannerBlockCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PlannerBlockCreateManyUserInputEnvelope;
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
};
export type PlannerBlockUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutUserInput, Prisma.PlannerBlockUncheckedCreateWithoutUserInput> | Prisma.PlannerBlockCreateWithoutUserInput[] | Prisma.PlannerBlockUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutUserInput | Prisma.PlannerBlockCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PlannerBlockCreateManyUserInputEnvelope;
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
};
export type PlannerBlockUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutUserInput, Prisma.PlannerBlockUncheckedCreateWithoutUserInput> | Prisma.PlannerBlockCreateWithoutUserInput[] | Prisma.PlannerBlockUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutUserInput | Prisma.PlannerBlockCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PlannerBlockUpsertWithWhereUniqueWithoutUserInput | Prisma.PlannerBlockUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PlannerBlockCreateManyUserInputEnvelope;
    set?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    disconnect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    delete?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    update?: Prisma.PlannerBlockUpdateWithWhereUniqueWithoutUserInput | Prisma.PlannerBlockUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PlannerBlockUpdateManyWithWhereWithoutUserInput | Prisma.PlannerBlockUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PlannerBlockScalarWhereInput | Prisma.PlannerBlockScalarWhereInput[];
};
export type PlannerBlockUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutUserInput, Prisma.PlannerBlockUncheckedCreateWithoutUserInput> | Prisma.PlannerBlockCreateWithoutUserInput[] | Prisma.PlannerBlockUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutUserInput | Prisma.PlannerBlockCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PlannerBlockUpsertWithWhereUniqueWithoutUserInput | Prisma.PlannerBlockUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PlannerBlockCreateManyUserInputEnvelope;
    set?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    disconnect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    delete?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    update?: Prisma.PlannerBlockUpdateWithWhereUniqueWithoutUserInput | Prisma.PlannerBlockUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PlannerBlockUpdateManyWithWhereWithoutUserInput | Prisma.PlannerBlockUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PlannerBlockScalarWhereInput | Prisma.PlannerBlockScalarWhereInput[];
};
export type PlannerBlockCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutSubjectInput, Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput> | Prisma.PlannerBlockCreateWithoutSubjectInput[] | Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput | Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.PlannerBlockCreateManySubjectInputEnvelope;
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
};
export type PlannerBlockUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutSubjectInput, Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput> | Prisma.PlannerBlockCreateWithoutSubjectInput[] | Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput | Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.PlannerBlockCreateManySubjectInputEnvelope;
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
};
export type PlannerBlockUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutSubjectInput, Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput> | Prisma.PlannerBlockCreateWithoutSubjectInput[] | Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput | Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.PlannerBlockUpsertWithWhereUniqueWithoutSubjectInput | Prisma.PlannerBlockUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.PlannerBlockCreateManySubjectInputEnvelope;
    set?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    disconnect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    delete?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    update?: Prisma.PlannerBlockUpdateWithWhereUniqueWithoutSubjectInput | Prisma.PlannerBlockUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.PlannerBlockUpdateManyWithWhereWithoutSubjectInput | Prisma.PlannerBlockUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.PlannerBlockScalarWhereInput | Prisma.PlannerBlockScalarWhereInput[];
};
export type PlannerBlockUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.PlannerBlockCreateWithoutSubjectInput, Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput> | Prisma.PlannerBlockCreateWithoutSubjectInput[] | Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput | Prisma.PlannerBlockCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.PlannerBlockUpsertWithWhereUniqueWithoutSubjectInput | Prisma.PlannerBlockUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.PlannerBlockCreateManySubjectInputEnvelope;
    set?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    disconnect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    delete?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    connect?: Prisma.PlannerBlockWhereUniqueInput | Prisma.PlannerBlockWhereUniqueInput[];
    update?: Prisma.PlannerBlockUpdateWithWhereUniqueWithoutSubjectInput | Prisma.PlannerBlockUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.PlannerBlockUpdateManyWithWhereWithoutSubjectInput | Prisma.PlannerBlockUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.PlannerBlockScalarWhereInput | Prisma.PlannerBlockScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PlannerBlockCreateWithoutUserInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    subject: Prisma.SubjectCreateNestedOneWithoutPlannerBlocksInput;
};
export type PlannerBlockUncheckedCreateWithoutUserInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    subjectId: string;
};
export type PlannerBlockCreateOrConnectWithoutUserInput = {
    where: Prisma.PlannerBlockWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlannerBlockCreateWithoutUserInput, Prisma.PlannerBlockUncheckedCreateWithoutUserInput>;
};
export type PlannerBlockCreateManyUserInputEnvelope = {
    data: Prisma.PlannerBlockCreateManyUserInput | Prisma.PlannerBlockCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PlannerBlockUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PlannerBlockWhereUniqueInput;
    update: Prisma.XOR<Prisma.PlannerBlockUpdateWithoutUserInput, Prisma.PlannerBlockUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PlannerBlockCreateWithoutUserInput, Prisma.PlannerBlockUncheckedCreateWithoutUserInput>;
};
export type PlannerBlockUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PlannerBlockWhereUniqueInput;
    data: Prisma.XOR<Prisma.PlannerBlockUpdateWithoutUserInput, Prisma.PlannerBlockUncheckedUpdateWithoutUserInput>;
};
export type PlannerBlockUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PlannerBlockScalarWhereInput;
    data: Prisma.XOR<Prisma.PlannerBlockUpdateManyMutationInput, Prisma.PlannerBlockUncheckedUpdateManyWithoutUserInput>;
};
export type PlannerBlockScalarWhereInput = {
    AND?: Prisma.PlannerBlockScalarWhereInput | Prisma.PlannerBlockScalarWhereInput[];
    OR?: Prisma.PlannerBlockScalarWhereInput[];
    NOT?: Prisma.PlannerBlockScalarWhereInput | Prisma.PlannerBlockScalarWhereInput[];
    id?: Prisma.StringFilter<"PlannerBlock"> | string;
    dayOfWeek?: Prisma.IntFilter<"PlannerBlock"> | number;
    durationMinutes?: Prisma.IntFilter<"PlannerBlock"> | number;
    subjectId?: Prisma.StringFilter<"PlannerBlock"> | string;
    userId?: Prisma.StringFilter<"PlannerBlock"> | string;
};
export type PlannerBlockCreateWithoutSubjectInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    user: Prisma.UserCreateNestedOneWithoutPlannerBlocksInput;
};
export type PlannerBlockUncheckedCreateWithoutSubjectInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    userId: string;
};
export type PlannerBlockCreateOrConnectWithoutSubjectInput = {
    where: Prisma.PlannerBlockWhereUniqueInput;
    create: Prisma.XOR<Prisma.PlannerBlockCreateWithoutSubjectInput, Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput>;
};
export type PlannerBlockCreateManySubjectInputEnvelope = {
    data: Prisma.PlannerBlockCreateManySubjectInput | Prisma.PlannerBlockCreateManySubjectInput[];
    skipDuplicates?: boolean;
};
export type PlannerBlockUpsertWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.PlannerBlockWhereUniqueInput;
    update: Prisma.XOR<Prisma.PlannerBlockUpdateWithoutSubjectInput, Prisma.PlannerBlockUncheckedUpdateWithoutSubjectInput>;
    create: Prisma.XOR<Prisma.PlannerBlockCreateWithoutSubjectInput, Prisma.PlannerBlockUncheckedCreateWithoutSubjectInput>;
};
export type PlannerBlockUpdateWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.PlannerBlockWhereUniqueInput;
    data: Prisma.XOR<Prisma.PlannerBlockUpdateWithoutSubjectInput, Prisma.PlannerBlockUncheckedUpdateWithoutSubjectInput>;
};
export type PlannerBlockUpdateManyWithWhereWithoutSubjectInput = {
    where: Prisma.PlannerBlockScalarWhereInput;
    data: Prisma.XOR<Prisma.PlannerBlockUpdateManyMutationInput, Prisma.PlannerBlockUncheckedUpdateManyWithoutSubjectInput>;
};
export type PlannerBlockCreateManyUserInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    subjectId: string;
};
export type PlannerBlockUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    subject?: Prisma.SubjectUpdateOneRequiredWithoutPlannerBlocksNestedInput;
};
export type PlannerBlockUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlannerBlockUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    subjectId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlannerBlockCreateManySubjectInput = {
    id?: string;
    dayOfWeek: number;
    durationMinutes: number;
    userId: string;
};
export type PlannerBlockUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    user?: Prisma.UserUpdateOneRequiredWithoutPlannerBlocksNestedInput;
};
export type PlannerBlockUncheckedUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlannerBlockUncheckedUpdateManyWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    durationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PlannerBlockSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dayOfWeek?: boolean;
    durationMinutes?: boolean;
    subjectId?: boolean;
    userId?: boolean;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["plannerBlock"]>;
export type PlannerBlockSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dayOfWeek?: boolean;
    durationMinutes?: boolean;
    subjectId?: boolean;
    userId?: boolean;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["plannerBlock"]>;
export type PlannerBlockSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    dayOfWeek?: boolean;
    durationMinutes?: boolean;
    subjectId?: boolean;
    userId?: boolean;
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["plannerBlock"]>;
export type PlannerBlockSelectScalar = {
    id?: boolean;
    dayOfWeek?: boolean;
    durationMinutes?: boolean;
    subjectId?: boolean;
    userId?: boolean;
};
export type PlannerBlockOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "dayOfWeek" | "durationMinutes" | "subjectId" | "userId", ExtArgs["result"]["plannerBlock"]>;
export type PlannerBlockInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PlannerBlockIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PlannerBlockIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subject?: boolean | Prisma.SubjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PlannerBlockPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PlannerBlock";
    objects: {
        subject: Prisma.$SubjectPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        dayOfWeek: number;
        durationMinutes: number;
        subjectId: string;
        userId: string;
    }, ExtArgs["result"]["plannerBlock"]>;
    composites: {};
};
export type PlannerBlockGetPayload<S extends boolean | null | undefined | PlannerBlockDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload, S>;
export type PlannerBlockCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PlannerBlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PlannerBlockCountAggregateInputType | true;
};
export interface PlannerBlockDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PlannerBlock'];
        meta: {
            name: 'PlannerBlock';
        };
    };
    /**
     * Find zero or one PlannerBlock that matches the filter.
     * @param {PlannerBlockFindUniqueArgs} args - Arguments to find a PlannerBlock
     * @example
     * // Get one PlannerBlock
     * const plannerBlock = await prisma.plannerBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlannerBlockFindUniqueArgs>(args: Prisma.SelectSubset<T, PlannerBlockFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PlannerBlock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlannerBlockFindUniqueOrThrowArgs} args - Arguments to find a PlannerBlock
     * @example
     * // Get one PlannerBlock
     * const plannerBlock = await prisma.plannerBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlannerBlockFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PlannerBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PlannerBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlannerBlockFindFirstArgs} args - Arguments to find a PlannerBlock
     * @example
     * // Get one PlannerBlock
     * const plannerBlock = await prisma.plannerBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlannerBlockFindFirstArgs>(args?: Prisma.SelectSubset<T, PlannerBlockFindFirstArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PlannerBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlannerBlockFindFirstOrThrowArgs} args - Arguments to find a PlannerBlock
     * @example
     * // Get one PlannerBlock
     * const plannerBlock = await prisma.plannerBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlannerBlockFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PlannerBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PlannerBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlannerBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlannerBlocks
     * const plannerBlocks = await prisma.plannerBlock.findMany()
     *
     * // Get first 10 PlannerBlocks
     * const plannerBlocks = await prisma.plannerBlock.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const plannerBlockWithIdOnly = await prisma.plannerBlock.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PlannerBlockFindManyArgs>(args?: Prisma.SelectSubset<T, PlannerBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PlannerBlock.
     * @param {PlannerBlockCreateArgs} args - Arguments to create a PlannerBlock.
     * @example
     * // Create one PlannerBlock
     * const PlannerBlock = await prisma.plannerBlock.create({
     *   data: {
     *     // ... data to create a PlannerBlock
     *   }
     * })
     *
     */
    create<T extends PlannerBlockCreateArgs>(args: Prisma.SelectSubset<T, PlannerBlockCreateArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PlannerBlocks.
     * @param {PlannerBlockCreateManyArgs} args - Arguments to create many PlannerBlocks.
     * @example
     * // Create many PlannerBlocks
     * const plannerBlock = await prisma.plannerBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PlannerBlockCreateManyArgs>(args?: Prisma.SelectSubset<T, PlannerBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PlannerBlocks and returns the data saved in the database.
     * @param {PlannerBlockCreateManyAndReturnArgs} args - Arguments to create many PlannerBlocks.
     * @example
     * // Create many PlannerBlocks
     * const plannerBlock = await prisma.plannerBlock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PlannerBlocks and only return the `id`
     * const plannerBlockWithIdOnly = await prisma.plannerBlock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PlannerBlockCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PlannerBlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PlannerBlock.
     * @param {PlannerBlockDeleteArgs} args - Arguments to delete one PlannerBlock.
     * @example
     * // Delete one PlannerBlock
     * const PlannerBlock = await prisma.plannerBlock.delete({
     *   where: {
     *     // ... filter to delete one PlannerBlock
     *   }
     * })
     *
     */
    delete<T extends PlannerBlockDeleteArgs>(args: Prisma.SelectSubset<T, PlannerBlockDeleteArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PlannerBlock.
     * @param {PlannerBlockUpdateArgs} args - Arguments to update one PlannerBlock.
     * @example
     * // Update one PlannerBlock
     * const plannerBlock = await prisma.plannerBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PlannerBlockUpdateArgs>(args: Prisma.SelectSubset<T, PlannerBlockUpdateArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PlannerBlocks.
     * @param {PlannerBlockDeleteManyArgs} args - Arguments to filter PlannerBlocks to delete.
     * @example
     * // Delete a few PlannerBlocks
     * const { count } = await prisma.plannerBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PlannerBlockDeleteManyArgs>(args?: Prisma.SelectSubset<T, PlannerBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PlannerBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlannerBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlannerBlocks
     * const plannerBlock = await prisma.plannerBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PlannerBlockUpdateManyArgs>(args: Prisma.SelectSubset<T, PlannerBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PlannerBlocks and returns the data updated in the database.
     * @param {PlannerBlockUpdateManyAndReturnArgs} args - Arguments to update many PlannerBlocks.
     * @example
     * // Update many PlannerBlocks
     * const plannerBlock = await prisma.plannerBlock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PlannerBlocks and only return the `id`
     * const plannerBlockWithIdOnly = await prisma.plannerBlock.updateManyAndReturn({
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
    updateManyAndReturn<T extends PlannerBlockUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PlannerBlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PlannerBlock.
     * @param {PlannerBlockUpsertArgs} args - Arguments to update or create a PlannerBlock.
     * @example
     * // Update or create a PlannerBlock
     * const plannerBlock = await prisma.plannerBlock.upsert({
     *   create: {
     *     // ... data to create a PlannerBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlannerBlock we want to update
     *   }
     * })
     */
    upsert<T extends PlannerBlockUpsertArgs>(args: Prisma.SelectSubset<T, PlannerBlockUpsertArgs<ExtArgs>>): Prisma.Prisma__PlannerBlockClient<runtime.Types.Result.GetResult<Prisma.$PlannerBlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PlannerBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlannerBlockCountArgs} args - Arguments to filter PlannerBlocks to count.
     * @example
     * // Count the number of PlannerBlocks
     * const count = await prisma.plannerBlock.count({
     *   where: {
     *     // ... the filter for the PlannerBlocks we want to count
     *   }
     * })
    **/
    count<T extends PlannerBlockCountArgs>(args?: Prisma.Subset<T, PlannerBlockCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PlannerBlockCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PlannerBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlannerBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlannerBlockAggregateArgs>(args: Prisma.Subset<T, PlannerBlockAggregateArgs>): Prisma.PrismaPromise<GetPlannerBlockAggregateType<T>>;
    /**
     * Group by PlannerBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlannerBlockGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PlannerBlockGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PlannerBlockGroupByArgs['orderBy'];
    } : {
        orderBy?: PlannerBlockGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PlannerBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlannerBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PlannerBlock model
     */
    readonly fields: PlannerBlockFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PlannerBlock.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PlannerBlockClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    subject<T extends Prisma.SubjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubjectDefaultArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PlannerBlock model
 */
export interface PlannerBlockFieldRefs {
    readonly id: Prisma.FieldRef<"PlannerBlock", 'String'>;
    readonly dayOfWeek: Prisma.FieldRef<"PlannerBlock", 'Int'>;
    readonly durationMinutes: Prisma.FieldRef<"PlannerBlock", 'Int'>;
    readonly subjectId: Prisma.FieldRef<"PlannerBlock", 'String'>;
    readonly userId: Prisma.FieldRef<"PlannerBlock", 'String'>;
}
/**
 * PlannerBlock findUnique
 */
export type PlannerBlockFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PlannerBlock to fetch.
     */
    where: Prisma.PlannerBlockWhereUniqueInput;
};
/**
 * PlannerBlock findUniqueOrThrow
 */
export type PlannerBlockFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PlannerBlock to fetch.
     */
    where: Prisma.PlannerBlockWhereUniqueInput;
};
/**
 * PlannerBlock findFirst
 */
export type PlannerBlockFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PlannerBlock to fetch.
     */
    where?: Prisma.PlannerBlockWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlannerBlocks to fetch.
     */
    orderBy?: Prisma.PlannerBlockOrderByWithRelationInput | Prisma.PlannerBlockOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PlannerBlocks.
     */
    cursor?: Prisma.PlannerBlockWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlannerBlocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlannerBlocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PlannerBlocks.
     */
    distinct?: Prisma.PlannerBlockScalarFieldEnum | Prisma.PlannerBlockScalarFieldEnum[];
};
/**
 * PlannerBlock findFirstOrThrow
 */
export type PlannerBlockFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PlannerBlock to fetch.
     */
    where?: Prisma.PlannerBlockWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlannerBlocks to fetch.
     */
    orderBy?: Prisma.PlannerBlockOrderByWithRelationInput | Prisma.PlannerBlockOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PlannerBlocks.
     */
    cursor?: Prisma.PlannerBlockWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlannerBlocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlannerBlocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PlannerBlocks.
     */
    distinct?: Prisma.PlannerBlockScalarFieldEnum | Prisma.PlannerBlockScalarFieldEnum[];
};
/**
 * PlannerBlock findMany
 */
export type PlannerBlockFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PlannerBlocks to fetch.
     */
    where?: Prisma.PlannerBlockWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PlannerBlocks to fetch.
     */
    orderBy?: Prisma.PlannerBlockOrderByWithRelationInput | Prisma.PlannerBlockOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PlannerBlocks.
     */
    cursor?: Prisma.PlannerBlockWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PlannerBlocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PlannerBlocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PlannerBlocks.
     */
    distinct?: Prisma.PlannerBlockScalarFieldEnum | Prisma.PlannerBlockScalarFieldEnum[];
};
/**
 * PlannerBlock create
 */
export type PlannerBlockCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PlannerBlock.
     */
    data: Prisma.XOR<Prisma.PlannerBlockCreateInput, Prisma.PlannerBlockUncheckedCreateInput>;
};
/**
 * PlannerBlock createMany
 */
export type PlannerBlockCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlannerBlocks.
     */
    data: Prisma.PlannerBlockCreateManyInput | Prisma.PlannerBlockCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PlannerBlock createManyAndReturn
 */
export type PlannerBlockCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlannerBlock
     */
    select?: Prisma.PlannerBlockSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PlannerBlock
     */
    omit?: Prisma.PlannerBlockOmit<ExtArgs> | null;
    /**
     * The data used to create many PlannerBlocks.
     */
    data: Prisma.PlannerBlockCreateManyInput | Prisma.PlannerBlockCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PlannerBlockIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PlannerBlock update
 */
export type PlannerBlockUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PlannerBlock.
     */
    data: Prisma.XOR<Prisma.PlannerBlockUpdateInput, Prisma.PlannerBlockUncheckedUpdateInput>;
    /**
     * Choose, which PlannerBlock to update.
     */
    where: Prisma.PlannerBlockWhereUniqueInput;
};
/**
 * PlannerBlock updateMany
 */
export type PlannerBlockUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PlannerBlocks.
     */
    data: Prisma.XOR<Prisma.PlannerBlockUpdateManyMutationInput, Prisma.PlannerBlockUncheckedUpdateManyInput>;
    /**
     * Filter which PlannerBlocks to update
     */
    where?: Prisma.PlannerBlockWhereInput;
    /**
     * Limit how many PlannerBlocks to update.
     */
    limit?: number;
};
/**
 * PlannerBlock updateManyAndReturn
 */
export type PlannerBlockUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlannerBlock
     */
    select?: Prisma.PlannerBlockSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PlannerBlock
     */
    omit?: Prisma.PlannerBlockOmit<ExtArgs> | null;
    /**
     * The data used to update PlannerBlocks.
     */
    data: Prisma.XOR<Prisma.PlannerBlockUpdateManyMutationInput, Prisma.PlannerBlockUncheckedUpdateManyInput>;
    /**
     * Filter which PlannerBlocks to update
     */
    where?: Prisma.PlannerBlockWhereInput;
    /**
     * Limit how many PlannerBlocks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PlannerBlockIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PlannerBlock upsert
 */
export type PlannerBlockUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PlannerBlock to update in case it exists.
     */
    where: Prisma.PlannerBlockWhereUniqueInput;
    /**
     * In case the PlannerBlock found by the `where` argument doesn't exist, create a new PlannerBlock with this data.
     */
    create: Prisma.XOR<Prisma.PlannerBlockCreateInput, Prisma.PlannerBlockUncheckedCreateInput>;
    /**
     * In case the PlannerBlock was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PlannerBlockUpdateInput, Prisma.PlannerBlockUncheckedUpdateInput>;
};
/**
 * PlannerBlock delete
 */
export type PlannerBlockDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PlannerBlock to delete.
     */
    where: Prisma.PlannerBlockWhereUniqueInput;
};
/**
 * PlannerBlock deleteMany
 */
export type PlannerBlockDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PlannerBlocks to delete
     */
    where?: Prisma.PlannerBlockWhereInput;
    /**
     * Limit how many PlannerBlocks to delete.
     */
    limit?: number;
};
/**
 * PlannerBlock without action
 */
export type PlannerBlockDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=PlannerBlock.d.ts.map