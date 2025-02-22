'use strict';

const { Contract } = require('fabric-contract-api');
const shim = require('fabric-shim');

console.info('StockProductContract: Chaincode container starting...');

class StockProductContract extends Contract {
    constructor() {
        super('StockProductContract');
    }

    async Init(stub) {
        console.log('Init: Stub object:', stub); // Log stub
        try {
            console.info('============= START : Initialize Ledger ===========');
            await stub.putState("dummyKey", Buffer.from("dummyValue"));
            console.info('============= END : Initialize Ledger ===========');
            return shim.success(Buffer.from("Initialization successful"));
        } catch (error) {
            console.error('InitLedger error:', error);
            return shim.error(error.message);
        }
    }

    async Invoke(stub) {
        console.log('Invoke: Stub object:', stub); // Log stub
        const functionName = stub.getFunctionAndParameters().fcn;
        const args = stub.getFunctionAndParameters().params;
        console.log('Invoke: Function name:', functionName, 'Args:', args);

        if (functionName === 'createStockProduct') {
            const result = await this.createStockProduct(stub, ...args);
            console.log('Invoke: createStockProduct returned:', result);
            return shim.success(result);
        } else if (functionName === 'readStockProduct') {
            const result = await this.readStockProduct(stub, ...args);
            console.log('Invoke: readStockProduct returned:', result);
            return shim.success(result);
        } else if (functionName === 'updateStockProduct') {
            const result = await this.updateStockProduct(stub, ...args);
            console.log('Invoke: updateStockProduct returned:', result);
            return shim.success(result);
        } else if (functionName === 'deleteStockProduct') {
            const result = await this.deleteStockProduct(stub, ...args);
            console.log('Invoke: deleteStockProduct returned:', result);
            return shim.success(result);
        } else {
            console.log('Invoke: Unknown function:', functionName);
            return stub.error(`Unknown function: ${functionName}`);
        }
        console.log("Invoke method finished");
    }

    async createStockProduct(
        stub,
        stockProductId,
        stockId,
        productId,
        amount,
        totalSales,
        transactionCompleted
    ) {
        console.log('createStockProduct: Stub object:', stub); // Log stub
        console.log('createStockProduct: Args:', stockProductId, stockId, productId, amount, totalSales, transactionCompleted);
        try {
            console.info('============= START : Create StockProduct ===========');

            const stockProduct = {
                stockId: stockId,
                productId: productId,
                amount: parseFloat(amount),
                totalSales: parseFloat(totalSales),
                transactionCompleted: transactionCompleted === 'true',
            };

            console.log('createStockProduct: Stock product object:', stockProduct);

            await stub.putState(
                stockProductId,
                Buffer.from(JSON.stringify(stockProduct))
            );

            console.info('============= END : Create StockProduct ===========');
            const result = Buffer.from(JSON.stringify(stockProduct));
            console.log('createStockProduct: Result:', result);
            return result;
        } catch (error) {
            console.error('createStockProduct error:', error);
            return shim.error(error.message);
        }
    }

    async readStockProduct(stub, stockProductId) {
        console.log('readStockProduct: Stub object:', stub); // Log stub
        console.log('readStockProduct: stockProductId:', stockProductId);
        try {
            console.info('============= START : Read StockProduct ===========');
            const stockProductJSON = await stub.getState(stockProductId);

            console.log('readStockProduct: stockProductJSON:', stockProductJSON);

            if (!stockProductJSON || stockProductJSON.length === 0) {
                console.log('readStockProduct: Stock product not found:', stockProductId);
                return shim.error(`${stockProductId} does not exist`);
            }

            console.info('============= END : Read StockProduct ===========');
            const result = stockProductJSON;
            console.log('readStockProduct: Result:', result);
            return result;
        } catch (error) {
            console.error('readStockProduct error:', error);
            return shim.error(error.message);
        }
    }

    async updateStockProduct(
        stub,
        stockProductId,
        stockId,
        productId,
        amount,
        totalSales,
        transactionCompleted
    ) {
        console.log('updateStockProduct: Stub object:', stub); // Log stub
        console.log('updateStockProduct: Args:', stockProductId, stockId, productId, amount, totalSales, transactionCompleted);
        try {
            console.info('============= START : Update StockProduct ===========');
            const stockProductJSON = await stub.getState(stockProductId);

            console.log('updateStockProduct: stockProductJSON:', stockProductJSON);

            if (!stockProductJSON || stockProductJSON.length === 0) {
                console.log('updateStockProduct: Stock product not found:', stockProductId);
                return shim.error(`${stockProductId} does not exist`);
            }

            const stockProduct = {
                stockId: stockId,
                productId: productId,
                amount: parseFloat(amount),
                totalSales: parseFloat(totalSales),
                transactionCompleted: transactionCompleted === 'true',
            };

            console.log('updateStockProduct: Updated stock product object:', stockProduct);

            await stub.putState(
                stockProductId,
                Buffer.from(JSON.stringify(stockProduct))
            );

            console.info('============= END : Update StockProduct ===========');
            const result = Buffer.from(JSON.stringify(stockProduct));
            console.log('updateStockProduct: Result:', result);
            return result;
        } catch (error) {
            console.error('updateStockProduct error:', error);
            return shim.error(error.message);
        }
    }

    async deleteStockProduct(stub, stockProductId) {
        console.log('deleteStockProduct: Stub object:', stub); // Log stub
        console.log('deleteStockProduct: stockProductId:', stockProductId);
        try {
            console.info('============= START : Delete StockProduct ===========');
            const stockProductJSON = await stub.getState(stockProductId);

            console.log('deleteStockProduct: stockProductJSON:', stockProductJSON);

            if (!stockProductJSON || stockProductJSON.length === 0) {
                console.log('deleteStockProduct: Stock product not found:', stockProductId);
                return shim.error(`${stockProductId} does not exist`);
            }

            await stub.deleteState(stockProductId);

            console.info('============= END : Delete StockProduct ===========');
            const result = Buffer.from(`Stock product ${stockProductId} deleted`);
            console.log('deleteStockProduct: Result:', result);
            return result;
        } catch (error) {
            console.error('deleteStockProduct error:', error);
            return shim.error(error.message);
        }
    }
}

module.exports = { StockProductContract };