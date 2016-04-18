/**
 * Created by tonyjiang on 16/3/9.
 */
import React,{Component} from 'react'

import DashboardItem from './DashboardItem'

class Dashboard extends Component{

    constructor(){
        super(arguments);


    }

    static defaultProps = {
        follower : {
            label : '三解人衣',
            prefix : 'sanjiery'
        }
    }

    state = {
        type : 'all',
        num : 20,
        total : 0,
        start : 0
    }

    data = []

    //更换目标
    componentWillReceiveProps(nextProps){
        console.log('dashboard props change');
        this.data.length = 0;
        this.getInitInfo(nextProps.follower.prefix);
        //this.pullList();
    }

    componentWillMount(){

    }

    getInitInfo(prefix){
        console.log('get init');
        let url = url = 'http://' + prefix + '.tumblr.com/api/read/json';

        $.ajax({
            url : url,
            dataType : 'jsonp',
            success : function(data){
                this.setState({
                    total : data['posts-total'],
                    start : data['posts-start']
                });

                this.pullList();

            }.bind(this)
        })
    }

    pullList(){
        let url = [
            'http://' + this.props.follower.prefix + '.tumblr.com/api/read/json?',
            'start=' , this.state.start,
            '&num=' , this.state.num ,
            (this.state.type == 'all' ? '' : '&type=' + this.state.type)
        ].join('');

        $.ajax({
            url : url,
            dataType : 'jsonp',
            success : function(data){
                this.data = this.data.concat(data.posts);
                this.forceUpdate();
            }.bind(this)
        })


    }


    render(){

        let listHTML = this.data.map(function(item , index){
            return <DashboardItem item={item} key={item.id} />
        });

        return (
            <div className="dashboard">
                <div className="db-header h6">
                    <div className="header-title">{this.props.follower.label}</div>
                    <div className="badge">{this.state.total}</div></div>
                <div className="type-select btn-group">
                    <a className="btn btn-primary">
                        <span className="fui-image"></span>
                    </a>
                    <a className="btn btn-primary">
                        <span className="fui-video"></span>
                    </a>
                    <a className="btn btn-primary">
                        <span className="fui-chat"></span>
                    </a>
                </div>
                <div className="list">
                    {listHTML}
                </div>
            </div>
        );
    }
}

export default Dashboard