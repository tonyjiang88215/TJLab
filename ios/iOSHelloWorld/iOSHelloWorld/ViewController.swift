//
//  ViewController.swift
//  iOSHelloWorld
//
//  Created by TonyJiang on 14/11/1.
//  Copyright (c) 2014年 TonyJiang. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    
    @IBAction func onclick(sender: AnyObject) {
        label.text = "Hello TJ!";
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

