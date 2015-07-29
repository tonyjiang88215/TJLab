// Playground - noun: a place where people can play

import UIKit

var str = "Hello, playground"

let tutorialTeam = 56

let editorialTeam = 23

let totalTeam = tutorialTeam + editorialTeam



class TipCalculator{
    let total: Double
    let taxPct: Double
    let subtotal: Double

    init(total:Double , taxPct:Double){
        self.total = total
        self.taxPct = taxPct
        subtotal = total / (taxPct+1)
    }
    
    func calcTipWithTipPct(tipPct:Double)->Double{
        return subtotal * tipPct
    }
    
    func printPossibleTips() {
        println("15%: \(calcTipWithTipPct(0.15))")
        println("18%: \(calcTipWithTipPct(0.18))")
        println("20%: \(calcTipWithTipPct(0.20))")
    }
}

let tipCalc = TipCalculator(total: 33.25,     taxPct: 0.06)
tipCalc.printPossibleTips()