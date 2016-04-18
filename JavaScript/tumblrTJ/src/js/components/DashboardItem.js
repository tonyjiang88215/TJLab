/**
 * Created by tonyjiang on 16/3/10.
 */
import React , {Component} from 'react';


class DashboardItem extends Component{

    static defaultProps = {
        item : {}
    }

    state = {
        expend :false
    }

    render(){
        let item = this.props.item;

        console.log(this.state,item);

        let expendBtnInfo = {
            label : this.state.expend ? '收起' : '展开',
            className : this.state.expend ? 'fui-triangle-up-small expend' : 'fui-triangle-down-small expend'
        };

        let _photos = null;

        if(item.photos.length == 0){
            _photos = [{
                caption : item['photo-caption'],
                height : item.height,
                width: item.width,
                offset : '',
                'photo-url-75':item['photo-url-75'],
                'photo-url-100':item['photo-url-100'],
                'photo-url-250':item['photo-url-250'],
                'photo-url-400':item['photo-url-400'],
                'photo-url-500':item['photo-url-500'],
                'photo-url-1280':item['photo-url-1280']
            }]
        }else{
            _photos = item.photos;
        }


        let imgList = _photos.map(function(photo , index){
           return <img className="img" src={this.state.expend ? photo['photo-url-100'] : ''} style={{display:''}}></img>
        }.bind(this));

        return (
            <div className="item" key={item.id}>
                <div className="item-title">
                    <span>{item.slug}</span>
                    <span className={expendBtnInfo.className} onClick={this.expendHandler.bind(this)}>{expendBtnInfo.label}</span>
                </div>
                <div className="item-detail" style={{display:(this.state.expend ? '':'none')}}>
                    <div className="detail-content" dangerouslySetInnerHTML={{__html:item['photo-caption']}}></div>
                    <div className="item-img">
                        {imgList}
                    </div>
                </div>

            </div>
        );

    }

    expendHandler(){
        this.setState({
            expend : !this.state.expend
        })
    }

}

export default DashboardItem;