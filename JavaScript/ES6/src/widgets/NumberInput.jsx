import CommonInput from './input.jsx'
import http from '../../ajax'

export default class NumberInput extends CommonInput{
    _clickHandler(e){
        http.get('data.json').then(function(response){
            //console.log('get ' , data);
            return response.json();
        }).then(function(data){
            console.log('get : ' , data);
        }).catch(function(){
            console.log('error' , arguments);
        });

    }
}