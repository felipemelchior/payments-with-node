(function (){
    angular.module('primeiroApp').controller('billingCycleCtrl', [
        '$http',
        'messages',
    
        BillingCycleController 
    ])

    function BillingCycleController($http, messages) {
        const vm = this

        vm.create = () => {
            const url = 'http://localhost:3003/api/billingCycles'
            $http.post(url, vm.billingCycle).then((response) => {
                vm.billingCycle = {}
                messages.addSuccess('Operação realizada com sucesso!')
            }).catch((data) => {
                messages.addError(data.data.errors)
            })
        }
    }
})()