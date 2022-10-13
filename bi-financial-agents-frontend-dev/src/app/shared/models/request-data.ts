export interface RequestData<T> {
    data: T;
    operationId: string;
    statusCode: number;
    transactionId: string;
    transactionName: string;
}
