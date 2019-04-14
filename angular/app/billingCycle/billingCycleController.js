(function (){
    angular.module('primeiroApp').controller('billingCycleCtrl', [
        '$http',
        'messages',
        'tabs',
    
        BillingCycleController 
    ])

    function BillingCycleController($http, messages, tabs) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = () => {
            $http.get(url).then((response) => {
                vm.billingCycle = {}
                vm.billingCycles = response.data

                tabs.show(vm, {tabList: true, tabCreate: true})
            })
        }

        vm.create = () => {
            $http.post(url, vm.billingCycle).then((response) => {
                vm.refresh()
                messages.addSuccess('Operação realizada com sucesso!')
            }).catch((data) => {
                messages.addError(data.data.errors)
            })
        }

        vm.showTabUpdate = (billingCycle) => {
            vm.billingCycle = billingCycle
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = (billingCycle) => {
            vm.billingCycle = billingCycle
            tabs.show(vm, {tabDelete: true})
        }

        vm.refresh()
    }
})()