/**
 * Created by tonyjiang on 16/3/9.
 */
import React , {Component} from 'react'
import $ from "zepto-modules"
import oauthSignature from 'oauth-signature'


import FollowList from '../components/FollowList'
import Dashboard from '../components/Dashboard'

let followData = [
    {label : '三解人衣', prefix: 'sanjiery'},
    {label : 'holy-virgin' , prefix: 'holy-virgin'},
    {label : '看着我' , prefix: '51lookatme'},
    {label : '5397摄影师' , prefix: '5397sb'},
    {label : 'bellevie888人体艺术摄影' , prefix: 'bellevie888'},
    {label : 'Fresh Meat GIRLs' , prefix : 'yypinky'},
    {label : '分享家' , prefix : 'fenxj'},
    {label : '' , prefix : 'seanvil'},
    {label : '' , prefix : 'yiqimaster'},
    {label : '' , prefix : 'biyangla'},
    {label : '' , prefix : 'chenyigang'},
    {label : '' , prefix : 'oosakishiziko'},
    {label : '' , prefix : 'coco9645'},
    {label : '' , prefix : 'mylustfulwife'},
    {label : '' , prefix : 'miqiling'},
    {label : '' , prefix : 'ilikeellie'},//艾栗栗

];

class IndexPage extends Component{

    state = {
        currentFollower : {}
    }

    render(){

        return (<div className="index">
            <div className="left">
                <FollowList data={followData} onItemClick={this.onChangeFollow.bind(this)}  />
            </div>
            <div className="content">
                <Dashboard follower={this.state.currentFollower} />
            </div>


        </div>);
    }

    onChangeFollow(data){
        console.log('on change follow')
        this.setState({
            currentFollower : data
        });
    }

}

export default IndexPage