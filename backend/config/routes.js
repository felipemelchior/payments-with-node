const express = require('express')

module.exports = function (server) {
    //Api routes

    const router = express.Router()
    server.use('/api', router)

    const billingCycleService = require('../api/billingCycleService')
    billingCycleService.register(router, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    router.route('/billingSummary').get(billingSummaryService.getSummary)
}