(function (){
    angular.module('primeiroApp').controller('billingCycleCtrl', [
        '$http',
        'messages',
    
        BillingCycleController 
    ])

    function BillingCycleController($http, messages) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = () => {
            $http.get(url).then((response) => {
                vm.billingCycle = {}
                vm.billingCycles = response.data

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

        vm.refresh()
    }
})()