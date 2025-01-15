import { getDahboardData } from "./dashboard_controller.js"


document.addEventListener('DOMContentLoaded', async function () {


    const pending = document.getElementById('pending-loans')
    const active = document.getElementById('active-loans')
    const closed = document.getElementById('closed-loans')
    const table_entries = document.getElementById('table-entries')


    const [data, error] = await getDahboardData()
    if (error) {

        console.error(error)
        return
    }

    console.log(data)
    console.log(typeof(data.totalLoansRequested))
    pending.innerText = data.totalLoansRequested
    active.innerText = data.totalLoansApproved
    closed.innerText = data.totalLoansClosed



    const pendingLoans = data.pendingLoans
    console.log(pendingLoans)
    
    Object.entries(data.pendingLoans).forEach(([key, value]) => {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        const td5 = document.createElement('td')
        td1.innerText = value.name
        console.log(value.loanType)

        td2.innerText = value.loanType
        td3.innerText = value.loanAmount
        td4.innerText = value.loanStatus === '' ? 'pending' : 'pending'
        td5.innerHTML = `<a href="/loan/${value.id}" class="btn btn-primary">View</a>`
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.classList.add('h-20')
        table_entries.appendChild(tr)
    })

    const ctx = document.getElementById('myChart');
    const pie = document.getElementById('pie')

    pie.height = 150
    pie.width = 150
  

  new Chart(pie, {
    type: 'pie',

    data: {
        labels: [
          'Pending Loans',
          'Approved Loans',
          'Closed Loans'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [data.totalLoansRequested, data.totalLoansApproved, data.totalLoansClosed],
          backgroundColor: [
            'rgb(0, 0, 0)',
            'rgb(93, 95, 97)',
            'rgb(216, 205, 179)'
          ],
          hoverOffset: 4
        }]
      }
  })


})