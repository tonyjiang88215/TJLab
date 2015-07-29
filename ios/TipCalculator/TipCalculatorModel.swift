//
//  TipCalculatorModel.swift
//  TipCalculator
//
//  Created by TonyJiang on 14/11/1.
//  Copyright (c) 2014年 TonyJiang. All rights reserved.
//

import Foundation

class TipCalculatorModel{
    var total: Double
    var taxPct: Double
    var subtotal: Double{
        get {
            return total/(taxPct+1)
        }
    }
    
    init(total:Double , taxPct:Double){
        self.total = total
        self.taxPct = taxPct
    }
    
    func printPossibleTips() {
        println("15%: \(calcTipWithTipPct(0.15))")
        println("18%: \(calcTipWithTipPct(0.18))")
        println("20%: \(calcTipWithTipPct(0.20))")
    }
    
    func calcTipWithTipPct(tipPct:Double) -> Double {
        
        return subtotal * tipPct
    }
    func returnPossibleTips() -> Dictionary<Int, Double> {
        
        let possibleTipsInferred = [0.15, 0.18, 0.20]
        
        let possibleTipsExplicit = [0.15, 0.18, 0.20]
        var retval = Dictionary<Int, Double>()
        for possibleTip in possibleTipsInferred {
            let intPct = Int(possibleTip*100)
            retval[intPct] = calcTipWithTipPct(possibleTip) 
        } 
        return retval 
    }
}





