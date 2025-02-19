'use strict';

const { Contract } = require('fabric-contract-api');

class StockProductContract extends Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

    async createStockProduct(
        ctx,
        stockProductId,
        stockId,
        productId,
        amount,
        totalSales,
        transactionCompleted
    ) {
        console.info('============= START : Create StockProduct ===========');

        const stockProduct = {
            stockId: stockId,
            productId: productId,
            amount: parseFloat(amount),
            totalSales: parseFloat(totalSales),
            transactionCompleted: transactionCompleted === 'true', // Convert to boolean
        };

        await ctx.stub.putState(
            stockProductId,
            Buffer.from(JSON.stringify(stockProduct))
        );
        console.info('============= END : Create StockProduct ===========');
    }

    async readStockProduct(ctx, stockProductId) {
        console.info('============= START : Read StockProduct ===========');

        const stockProductJSON = await ctx.stub.getState(stockProductId);
        if (!stockProductJSON || stockProductJSON.length === 0) {
            throw new Error(`${stockProductId} does not exist`);
        }
        console.info('============= END : Read StockProduct ===========');
        return stockProductJSON.toString();
    }

    async updateStockProduct(
        ctx,
        stockProductId,
        stockId,
        productId,
        amount,
        totalSales,
        transactionCompleted
    ) {
        console.info('============= START : Update StockProduct ===========');

        const stockProductJSON = await ctx.stub.getState(stockProductId);
        if (!stockProductJSON || stockProductJSON.length === 0) {
            throw new Error(`${stockProductId} does not exist`);
        }

        const stockProduct = {
            stockId: stockId,
            productId: productId,
            amount: parseFloat(amount),
            totalSales: parseFloat(totalSales),
            transactionCompleted: transactionCompleted === 'true',
        };

        await ctx.stub.putState(
            stockProductId,
            Buffer.from(JSON.stringify(stockProduct))
        );
        console.info('============= END : Update StockProduct ===========');
    }

    async deleteStockProduct(ctx, stockProductId) {
        console.info('============= START : Delete StockProduct ===========');

        const stockProductJSON = await ctx.stub.getState(stockProductId);
        if (!stockProductJSON || stockProductJSON.length === 0) {
            throw new Error(`${stockProductId} does not exist`);
        }

        await ctx.stub.deleteState(stockProductId);
        console.info('============= END : Delete StockProduct ===========');
    }
}

module.exports = StockProductContract;
