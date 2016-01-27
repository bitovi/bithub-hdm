import can from "can";
import initView from "./sponsors.stache!";
import "can/list/promise/";
import "./sponsors.less!";

const URL = 'http://bithub.com/api/v4/embeds/2/entities?decision=starred&tenant_name=benevolent_foliage_3723&image_only=true&offset=0&limit=50';


var SponsorsBit = can.Model.extend({
	findAll : URL
});

export default can.Component.extend({
	tag: 'hdm-sponsors',
	template: initView,
	scope : {
		currentBitIdx: 0,
		define : {
			bits : {
				get : function(){
					return new SponsorsBit.List({});
				}
			}
		},
		currentBit : function(){
			if(this.attr('bits').isResolved()){
				return this.attr('bits.' + this.attr('currentBitIdx'));
			}
		},
		sponsors : function(){
			var index = this.attr('currentBitIdx');
			var list = new can.List();
			var bits = this.attr('bits');
			var length = bits.attr('length');
			for(var i = 0; i < 3; i++){
				list.push(bits.attr(index));
				index++;
				if(index === length){
					index = 0;
				}
			}
			return list;
		}
	},
	events : {
		init : function(){
			this._isCycleStarted = false;
		},
		"{scope.bits} length" : function(){
			if(!this._isCycleStarted){
				this._isCycleStarted = true;
				this.cycle();
			}
		},
		cycle : function(){
			var self = this;
			setTimeout(function(){
				var currentBitIdx = self.scope.attr('currentBitIdx');
				var length = self.scope.attr('bits.length');
				var nextIdx = currentBitIdx + 3;
				if(nextIdx >= length){
					nextIdx = 0;
				}
				self.scope.attr('currentBitIdx', nextIdx);
				self.cycle();
			}, 5000);
		}
	}
});
