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
                vm.billingCycle = {credits: [{}], debts: [{}]}
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

        vm.update = () => {
            const updateUrl = `${url}/${vm.billingCycle._id}`
            $http.put(updateUrl, vm.billingCycle).then((response) => {
                vm.refresh()
                messages.addSuccess('Operação realizada com sucesso!')
            }).catch((data) => {
                messages.addError(data.data.errors)
            })
        }

        vm.delete = () => {
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then((response) => {
                vm.refresh()
                messages.addSuccess('Operação realizada com sucesso!')
            }).catch((data) => {
                messages.addError(data.data.errors)
            })
        }

        vm.addCredit = (index) => {
            vm.billingCycle.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredit = (index, {name, value}) => {
            vm.billingCycle.credits.splice(index + 1, 0, {name, value})
        }

        vm.deleteCredit = (index) => {
            if(vm.billingCycle.credits.length > 1) {
                vm.billingCycle.credits.splice(index, 1)
            }
        }

        vm.addDebt = (index) => {
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = (index, {name, value, status}) => {
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
        }

        vm.deleteCredit = (index) => {
            if(vm.billingCycle.debts.length > 1) {
                vm.billingCycle.debts.splice(index, 1)
            }
        }

        vm.refresh()
    }
})()