/**
 * Created by tonyjiang on 16/3/9.
 */
import React , {Component} from 'react'

class FollowList extends Component{

    static defaultProps = {
        data : []
    }

    render(){
        let listHTML = this.props.data.map(function(data , index){
            return <div className="following-item small" key={data.prefix}>
                <div className="following-item-label" onClick={this._onClickHandler.bind(this , data)}>{data.label}</div>
                </div>;
        }.bind(this));

        return(
            <div className="following">
                <div className="following-title">Following</div>
                <div className="following-list">
                    {listHTML}
                </div>
            </div>
        );

    }

    _onClickHandler(data){
        console.log('click handler' , data);
        this.props.onItemClick && this.props.onItemClick(data);
    }

}

export default FollowList