
export class CustomNode{
    constructor(element,prev,next){
        this._element = element;
        this._prev = prev;
        this._next = next;

    }
}

export class LinkedList{

    /**
     * @constructor
     */
    constructor(name=null){
        this._name = name;
        this._head= new CustomNode(null,null,null);
        this._tail = new CustomNode(null,null,null);
        this._head._next = this._tail;
        this._tail._prev = this._head;
        this._length= 0;
        return this;
    }

    length(){
        return this._length;
    }

    /**
     *
     * @returns {boolean}
     */
    isEmpty(){
        return this._length === 0;
    }

    /**
     *
     * @param e
     * @param {CustomNode} predecessor
     * @param successor
     */
    insertBetween(e,predecessor, successor){
        let newest = new CustomNode(e,predecessor, successor);
        predecessor._next = newest;
        successor._prev = newest;
        this._length += 1;
        return this;
    }

    /**
     *
     * @param {CustomNode}CustomNode
     */
    deleteNode(CustomNode){
        let predecessor = CustomNode._prev;
        let successor = CustomNode._next;
        predecessor._next = successor;
        successor._prev = predecessor;
        this._length -= 1;
        CustomNode._prev=CustomNode._next=CustomNode._element = null;
        return this;
    }

    /**
     *
     * @param {CustomNode}element
     */
    insertFirst(element){
        this.insertBetween(element,this._head,this._head._next);
        return this;
    }

    /**
     *
     * @param element
     */
    add(element){
        this.insertBetween(element,this._tail._prev,this._tail);
        return this;
    }


    /**
     *
     * @returns {*}
     */
    pop(){
        if (this._length !== 0)
        {
            let toPop = this._tail._prev;
            this._tail._prev = toPop._prev;
            return toPop
        }
        else return 0
    }

    /**
     *
     * @returns {Array}
     */
    returnAll(){
        let node = this._head;
        let result =[];
        if (this._length !== 0){
            while(node._next !== this._tail){
                result.push(node._next);
                node = node._next;
            }
            return result
        }
        else return []

    }

    /**
     * @throws NotFoundError
     * @param name
     * @returns {*}
     */
    element(name) {
        let node = this._head;
        if (this._length > 0){
            while (node._next !== this._tail){
                if (node._next._element._name === name){
                    return node._next._element;
                }
                node = node._next;
            }
        }
        throw new NotFoundError;
    }
    clearAll(){
        this._head._next = this._tail;
        this._tail._prev = this._head;
        return this
    }
}
//Extends Linked List to implement a Tree ADT
export class Component extends LinkedList{

    constructor(name,id){
        super(name);
        if (id !== undefined)
        {
            this._id = id;
            this._class = "."+id;
        }
        else
            this._class = '';
        this._stylesheet = STYLESHEET;
        this._stylesheet.add(new StyleSelector(this._name+this._class));
        this._componentDimensions = {};
        this._textContent = '';
    }


    addCustomStyle(style) {

        if (style instanceof Array) {
            for(let x in style)
                Component.addIndCustomStyle(this,style[x]);
        }
        else
            Component.addIndCustomStyle(this,style);
        return this;
    }


    addPseudoElement(pseudoElement,style){

        if (style instanceof Array) {
            for(let x in style)
                Component.addIndPseudoElement(this, pseudoElement, style[x]);
        }
        else
            Component.addIndPseudoElement(this, pseudoElement,style);
        return this;

    }

    static addIndPseudoElement(object,pseudoElement,style){
        try {
            object._stylesheet.element(object._name + pseudoElement).add(style);

        }
        catch (e) {
            if (e instanceof NotFoundError) {
                object._stylesheet.add(new StyleSelector(object._name + pseudoElement));
                object._stylesheet.element(object._name + pseudoElement).add(style);

            }
        }

    }

    static addIndCustomStyle(object,style){
        try {
            object._stylesheet.element(object._name + object._class).add(style);

        }
        catch (e) {
            if (e instanceof NotFoundError) {
                object._stylesheet.add(new StyleSelector(object._name + object._class));
                object._stylesheet.element(object._name + object._class).add(style);

            }
        }
    }

    addComponent(component){
        if (component instanceof Array){
            for(let x in component){
                this.add(component[x])
            }
        }
        else
            this.add(component);
        return this;
    }

    /**
     *
     * @param id
     * @param eventType
     * @param functionExp
     */
    addEvent(id,eventType,functionExp){
        EVENTS.add(new Event(id,eventType,functionExp,this._id))
        return this
    }

    /**
     *
     * @param id
     */
    removeEvent(id){
        try{

            event = EVENTS.element(id);
            EVENTS.deleteNode(event)
        }
        catch (e) {  }
    }

    /**
     *
     * @param {String} content
     */
    setTextContent(content){
        this._textContent =content;

        return this;
    }

    getTextContent(){
        return this._textContent;
    }

    createElement(){
        return document.createElement(this._name);
    }


    setHeight(style){
        if(style instanceof Height){
            try{
                let height = this._stylesheet.element(this._name+this._class).element('height');
                height.setHeight(style._attributes[0])
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;
    }

    setWidth(style){
        if(style instanceof Width){
            try{
                let width = this._stylesheet.element(this._name+this._class).element('width');
                width.setWidth(style._attributes[0])
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;
    }

    setMaxHeight(style){
        if(style instanceof MaxHeight){
            try{
                let maxHeight = this._stylesheet.element(this._name+this._class).element('max-height');
                maxHeight.setMaxHeight(style._attributes[0])
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;
    }

    setMaxWidth(style){
        if(style instanceof MaxWidth){
            try{
                let maxWidth = this._stylesheet.element(this._name+this._class).element('max-width');
                maxWidth.setMaxWidth(style._attributes[0])
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;
    }

    setMinHeight(style){
        if(style instanceof MinHeight){
            try{
                let minHeight = this._stylesheet.element(this._name+this._class).element('min-height');
                minHeight.setMinHeight(style._attributes[0])
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;
    }
    setMinWidth(style){
        if(style instanceof MinWidth){
            try{
                let minWidth = this._stylesheet.element(this._name+this._class).element('min-width');
                minWidth.setMinWidth(style._attributes[0])
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
    }
    setMargin(style){
        if(style instanceof Margin){
            try{
                let margin = this._stylesheet.element(this._name+this._class).element('margin');
                margin.setTop(style._attributes[0]);
                margin.setRight(style._attributes[1]);
                margin.setBottom(style._attributes[2]);
                margin.setLeft(style._attributes[3]);
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;
    }
    setBorder(style){
        if(style instanceof Border){
            try{
                let border = this._stylesheet.element(this._name+this._class).element('border');
                border.setWidth(style._attributes[0]);
                border.setStyle(style._attributes[1]);
                border.setColor(style._attributes[2]);
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
    }
    setPadding(style){
        if(style._name === "padding"){
            try{
                let padding= this._stylesheet.element(this._name+this._class).element('padding');
                padding.setTop(style._attributes[0]);
                padding.setRight(style._attributes[1]);
                padding.setBottom(style._attributes[2]);
                padding.setLeft(style._attributes[3]);
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;

    }

    setOverflow(style){
        if(style instanceof Overflow){
            try{
                let overflow = this._stylesheet.element(this._name+this._class).element('overflow');
                overflow.setOverflow(style._attributes[0]);
                overflow.setUnit(style._unit)
            }
            catch (e) {

                this.addCustomStyle(style);
            }

        }
        return this;
    }

    setPositioning(position, unit = _UNITS.PX){
        let style =new Position(position);
        try{
            let newPosition = this._stylesheet.element(this._name+this._class).element('position');
            newPosition.setPosition(style._attributes[0]);
        }
        catch (e) {
            this.addCustomStyle(style);
        }

    }

    setTopPositioning(position, unit = _UNITS.PX){
        let style =new PositionTop(position);
        try{
            let newPosition = this._stylesheet.element(this._name+this._class).element('top');
            newPosition.setTopPositioning(style._attributes[0]);
            newPosition.setUnit(unit)
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;

    }

    setBottomPositioning(position, unit = _UNITS.PX){
        let style =new PositionBottom(position);
        try{
            let newPosition = this._stylesheet.element(this._name+this._class).element('bottom');
            newPosition.setBottomPositioning(style._attributes[0]);
            newPosition.setUnit(unit)
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;

    }

    setRightPositioning(position, unit = _UNITS.PX){
        let style =new PositionRight(position);
        try{
            let newPosition = this._stylesheet.element(this._name+this._class).element('right');
            newPosition.setRightPositioning(style._attributes[0]);
            newPosition.setUnit(unit)
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;

    }

    /**
     *
     * @param {Number}position
     * @param {String}unit
     */
    setLeftPositioning(position, unit = _UNITS.PX){
        let style =new PositionLeft(position,unit);
        try{
            let newPosition = this._stylesheet.element(this._name+this._class).element('left');
            newPosition.setLeftPositioning(style._attributes[0]);
            newPosition.setUnit(unit)
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;

    }

    /**
     *
     * @param {Number}zIndex
     */
    setZIndex(zIndex){
        let style =new ZIndex(zIndex);
        try{
            let newZIndex = this._stylesheet.element(this._name+this._class).element('z-index');
            newZIndex.setZIndex(style._attributes[0]);
        }
        catch (e) {
            this.addCustomStyle(zIndex);
        }
        return this;
    }

    /**
     *
     * @param {Number}float
     */
    setFloat(float){
        let style =new Float(float);
        try{
            let newFloat = this._stylesheet.element(this._name+this._class).element('float');
            newFloat.setFloat(style._attributes[0]);
        }
        catch (e) {
            this.addCustomStyle(style);
        }

        return this;
    }

    /**
     *
     * @param {Number}clear
     */
    setClear(clear){
        let style =new Clear(clear);
        try{
            let newFloat = this._stylesheet.element(this._name+this._class).element('clear');
            newFloat.setClear(style._attributes[0]);
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;
    }

    setColor(color){
        let style =new Color(color);
        try{
            let newFloat = this._stylesheet.element(this._name+this._class).element('color');
            newFloat.setHex(style._attributes[0]);
        }
        catch (e) {

            this.addCustomStyle(style);
        }
        return this;
    }

    setBGColor(color){
        let style =new BackgroundColor(color);
        try{
            let newBGColor = this._stylesheet.element(this._name+this._class).element('background-color');
            newBGColor.setHex(style._attributes[0]);
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;
    }
    setFont(font1 = FONT.SERIF  ,font2 = FONT.TIMES,font3 =FONT["TIMES NEW ROMAN"]) {
        let style = new FontFamily(font1, font2, font3);
        try {
            let newFont = this._stylesheet.element(this._name + this._class).element('font-family');
            newFont.setFont1(style._attributes[0]);
            newFont.setFont2(style._attributes[1]);
            newFont.setFont3(style._attributes[2]);
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;
    }
    setFontSize(size) {
        let style = new FontSize(size);
        try {
            let newSize = this._stylesheet.element(this._name + this._class).element('font-size');
            newSize.setSize(style._attributes[0]);
        }
        catch (e) {
            this.addCustomStyle(style);
        }
        return this;
    }


    printComponent(){

        let component ="";
        component += '<' + this._name +'>' + this._textContent;
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                component += node._next._element.printComponent();
                node = node._next;
            }
        }
        component += '</' + this._name +'>';
        return component;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        if(this._class !== '.' && this._class !== '')
        {
            component.classList.add(this._class.replace('.',''));
        }
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }


}
export class StyleSheet extends LinkedList{
    constructor(){
        super();
        return this;
    }

}
export class StyleSelector extends LinkedList{

}
export class Style {



    /**
     *
     * @param name
     */
    constructor(name){
        this._attributes=[];
        this._name =name;
        this._unit ='';
    }
    /**
     *
     * @param {String}unit
     */
    setUnit(unit){
        this._unit= unit;
        return this;
    }
    getUnit(){
        return this._unit;
    }

}


export const _UNITS={"PX":"px","PT":"pt","PC":"pc","MM":"mm","IN":"in","EX":"ex","EM":"em","CM":"cm","PERCENTILE":"%"};
export const BORDERSTYLE ={"SOLID" : "solid","DOTTED" :  "dotted","DASHED": "dashed","DOUBLE": "double","GROOVE" :"groove","RIDGE" : "ridge","INSET" : "inset","OUTSET" :"outset","HIDDEN" : "hidden"};
export const BORDERWIDTH={"THIN":"thin","MEDIUM":"medium","THICK":"THICK"};
export const OVERFLOW ={"HIDDEN": "hidden", "SCROLL":"scroll"};
export const STYLESHEET = new StyleSheet();
export const CLASSES = new LinkedList();
export const POSITION = {'RELATIVE':"relative",'ABSOLUTE':"absolute",'FIXED':"fixed"};
export const FLOAT = {'RIGHT':"right",'LEFT':"left",'NONE':"none"};
export const CLEAR = {'RIGHT':"right",'LEFT':"left",'BOTH':"both",'NONE':"none"};
export const FONT =  {"AGENCY FB":	 "agency fb",
    "ALBERTINA":	 "albertina",
    "ANTIQUA":	 "antiqua",
    "ARCHITECT":	 "architect",
    "ARIAL":	 "arial",
    "BANKFUTURISTIC":	 "bankfuturistic",
    "BANKGOTHIC":	 "bankgothic",
    "BLACKLETTER":	 "blackletter",
    "BLAGOVEST":	 "blagovest",
    "CALIBRI":	 "calibri",
    "COMIC SANS MS":	 "comic sans ms",
    "COURIER":	 "courier",
    "CURSIVE":	 "cursive",
    "DECORATIVE":	 "decorative",
    "FANTASY":	 "fantasy",
    "FRAKTUR":	 "fraktur",
    "FROSTY":	 "frosty",
    "GARAMOND":	 "garamond",
    "GEORGIA":	 "georgia",
    "HELVETICA":	 "helvetica",
    "IMPACT":	 "impact",
    "MINION":	 "minion",
    "MODERN":	 "modern",
    "MONOSPACE":	 "monospace",
    "OPEN SANS":	 "open sans",
    "PALATINO":	 "palatino",
    "PERPETUA":	 "perpetua",
    "ROMAN":	 "roman",
    "SANS-SERIF":	 "sans-serif",
    "SERIF":	 "serif",
    "SCRIPT":	 "script",
    "SWISS":	 "swiss",
    "TIMES":	 "times",
    "TIMES NEW ROMAN":	 "times new roman",
    "TW CEN MT":	 "tw cen mt",
    "VERDANA":	 "verdana",};
export const FONTWEIGHT ={'BOLD':"bold",'NORMAL':"normal"};
export const FONTSTYLE = {'NORMAL':"normal",'ITALIC': "italic",'OBLIQUE':"oblique"};
export const TEXTTRANSFORM = {'UPPERCASE':"uppercase",'LOWERCASE': "lowercase",'CAPITALIZE':"capitalize"};
export const TEXTDECORATION = {'NONE':"none",'UNDERLINE': "underline",'OVERLINE':"overline",'LINETHROUGH':"line-through",'BLINK':"blink"};
export const TEXTALIGNMENT = {'RIGHT':"right",'LEFT':"left",'JUSTIFY':"justify",'CENTER':"center"};
export const VERTICALALIGNMENT = {'TEXTTOP':"text-top;",'BASELINE':"baseline",'TEXTBOTTOM':"text-bottom"};
export const LISTSTYLETYPE = {'DECIMAL':"decimal",'DECIMALLEADINGZERO':"decimal-leading-zero",'LOWERALPHA':"lower-alpha",
    'UPPERALPHA':"upper-alpha",'LOWERROMAN':"lower-roman",'UPPERROMAN':"upper-roman",
    'NONE':"none",'DISC':"disc",'CIRCLE':"circle",'SQUARE':"square"};
export const LISTSTYLEPOSITION = {'OUTSIDE':"outside",'INSIDE':"inside"};
export const EMPTYCELLS = {'SHOW':"show",'HIDE':"hide",'INHERIT':"inherit"};
export const BORDERCOLLAPSE = {'COLLAPSE':"collapse",'SEPARATE':"separate"};
export const PRELOAD = {'NONE':"none",'AUTO':"auto",'METADATA':'metadata'};
export const CURSOR = {'AUTO':"auto",'CROSSHAIR':"crosshair",'DEFAULT':"default",'POINTER':"pointer",'MOVE':"move",'TEXT':"TEXT",'WAIT':"wait",'HELP':"help"};
export const EVENTS = new LinkedList();


export class HWindow extends Component{

    /**
     *
     *
     */
    constructor(){
        super('body');
        this._windowStyles = document.createElement('style');
        this._window_Dimensions = {};
        this._element = document.createElement('body');
        window.addEventListener('resize', () => {
            this.dimensionsUpdate(this)
        });
        this.setWindowDimension();
        this.setHeight(new Height(95));
        this.setWidth(new Width(95));
        /*  this.setMaxHeight(new MaxHeight(95));
        this.setMaxWidth(new MaxWidth(95));
        this.setMinHeight(new MinHeight(95));
        this.setMinWidth(new MinWidth(95)); */

        if (document.getElementsByTagName('head')) this._documentHead = document.getElementsByTagName('head')[0];
        else {
            this._documentHead= document.createElement('head');

        }
        return this;
    }
    setHeight(style){
        if(style instanceof Height)
            try{
                let height = this._stylesheet.element(this._name).element('height');
                if (style._unit === _UNITS.PERCENTILE)
                {
                    let heightDim = (style._attributes[0] /100) * this._window_Dimensions.height;
                    height.setHeight(heightDim);
                    height.setUnit(_UNITS.PX);
                }
                else {

                    height.setHeight(style._attributes[0]);
                    height.setUnit(style.getUnit());
                }

            }
            catch (e) {
                if (style._unit === _UNITS.PERCENTILE)
                {
                    //To implement setter
                    let height = (style._attributes[0] /100) *this._window_Dimensions.height;
                    let newHeight = new Height(height,_UNITS.PX);
                    this.addCustomStyle(newHeight);
                    this._componentDimensions.height=newHeight;
                    return newHeight

                }
                else
                    this.addCustomStyle(style);
            }
        return this;

    }
    setWidth(style){
        if(style instanceof Width)
            try{
                let width = this._stylesheet.element(this._name).element('width');
                if (style._unit === _UNITS.PERCENTILE)
                {
                    let widthDim = (style._attributes[0] /100) * this._window_Dimensions.width;
                    width.setWidth(widthDim);
                    width.setUnit(_UNITS.PX);
                }
                else {

                    width.setWidth(style._attributes[0]);
                    width.setUnit(style.getUnit());
                }

            }
            catch (e) {
                if (style._unit === _UNITS.PERCENTILE)
                {
                    //To implement setter
                    let width = (style._attributes[0] /100) *this._window_Dimensions.width;
                    let newWidth = new Width(width,_UNITS.PX);
                    this.addCustomStyle(newWidth);
                    this._componentDimensions.width=newWidth;
                    return newWidth

                }
                else
                    this.addCustomStyle(style);
            }
        return this;
    }
    setMaxHeight(style){
        if(style instanceof MaxHeight)
            try{
                let maxHeight = this._stylesheet.element(this._name).element('max-height');
                if (style._unit === _UNITS.PERCENTILE)
                {
                    let maxHeightDim = (style._attributes[0] /100) * this._window_Dimensions.height;
                    maxHeight.setMaxHeight(maxHeightDim);
                    maxHeight.setUnit(_UNITS.PX);
                }
                else {

                    maxHeight.setMaxHeight(style._attributes[0]);
                    maxHeight.setUnit(style.getUnit());
                }

            }
            catch (e) {
                if (style._unit === _UNITS.PERCENTILE)
                {
                    //To implement setter
                    let maxHeight = (style._attributes[0] /100) *this._window_Dimensions.height;
                    let newMaxHeight = new MaxHeight(maxHeight,_UNITS.PX);
                    this.addCustomStyle(newMaxHeight);
                    this._componentDimensions.maxHeight=newMaxHeight;
                    return newMaxHeight

                }
                else
                    this.addCustomStyle(style);
            }
        return this;

    }
    setMaxWidth(style){
        if(style instanceof MaxWidth)
            try{
                let maxWidth = this._stylesheet.element(this._name).element('max-width');
                if (style._unit === _UNITS.PERCENTILE)
                {
                    let maxWidthDim = (style._attributes[0] /100) * this._window_Dimensions.width;
                    maxWidth.setMaxWidth(maxWidthDim);
                    maxWidth.setUnit(_UNITS.PX);
                }
                else {

                    maxWidth.setMaxWidth(style._attributes[0]);
                    maxWidth.setUnit(style.getUnit());
                }

            }
            catch (e) {
                if (style._unit === _UNITS.PERCENTILE)
                {
                    //To implement setter
                    let maxWidth = (style._attributes[0] /100) *this._window_Dimensions.width;
                    let newMaxWidth = new MaxWidth(maxWidth,_UNITS.PX);
                    this.addCustomStyle(newMaxWidth);
                    this._componentDimensions.maxWidth=newMaxWidth;
                    return newMaxWidth

                }
                else
                    this.addCustomStyle(style);
            }
        return this;
    }
    setMinHeight(style){
        if(style instanceof MinHeight)
            try{
                let minHeight = this._stylesheet.element(this._name).element('min-height');
                if (style._unit === _UNITS.PERCENTILE)
                {
                    let minHeightDim = (style._attributes[0] /100) * this._window_Dimensions.height;
                    minHeight.setMinHeight(minHeightDim);
                    minHeight.setUnit(_UNITS.PX);
                }
                else {

                    minHeight.setMinHeight(style._attributes[0]);
                    minHeight.setUnit(style.getUnit());
                }

            }
            catch (e) {
                if (style._unit === _UNITS.PERCENTILE)
                {
                    //To implement setter
                    let minHeight = (style._attributes[0] /100) *this._window_Dimensions.height;
                    let newMinHeight = new MinHeight(minHeight,_UNITS.PX);
                    this.addCustomStyle(newMinHeight);
                    this._componentDimensions.minHeight=newMinHeight;
                    return newMinHeight

                }
                else
                    this.addCustomStyle(style);
            }
        return this;

    }
    setMinWidth(style){
        if(style instanceof MinWidth)
            try{
                let minWidth = this._stylesheet.element(this._name).element('min-width');
                if (style._unit === _UNITS.PERCENTILE)
                {
                    let minWidthDim = (style._attributes[0] /100) * this._window_Dimensions.width;
                    minWidth.setMinWidth(minWidthDim);
                    minWidth.setUnit(_UNITS.PX);
                }
                else {

                    minWidth.setMinWidth(style._attributes[0]);
                    minWidth.setUnit(style.getUnit());
                }

            }
            catch (e) {
                if (style._unit === _UNITS.PERCENTILE)
                {
                    //To implement setter
                    let minWidth = (style._attributes[0] /100) *this._window_Dimensions.width;
                    let newMinWidth = new MinWidth(minWidth,_UNITS.PX);
                    this.addCustomStyle(newMinWidth);
                    this._componentDimensions.minWidth = newMinWidth;
                    return newMinWidth

                }
                else
                    this.addCustomStyle(style);
            }
        return this;
    }


    setWindowDimension(){
        this._window_Dimensions.height = window.innerHeight;
        this._window_Dimensions.width = window.innerWidth;
    }
    dimensionsUpdate(Window=this){

        let heightChange = ( window.innerHeight - Window._window_Dimensions.height ) / Window._window_Dimensions.height;
        let widthChange = ( window.innerWidth - Window._window_Dimensions.width) / Window._window_Dimensions.width;
        Window._componentDimensions.height._attributes[0] *= 1 + heightChange;
        //Window._componentDimensions.height._attributes[0] *= 1 + widthChange;
        //Window._componentDimensions.width._attributes[0] *= 1 + heightChange;
        Window._componentDimensions.width._attributes[0] *= 1 + widthChange;
        /* Window._componentDimensions.minHeight._attributes[0] *= 1 + heightChange;
       // Window._componentDimensions.minHeight._attributes[0] *= 1 + widthChange;
       // Window._componentDimensions.minWidth._attributes[0] *= 1 + heightChange;
        Window._componentDimensions.minWidth._attributes[0] *= 1 + widthChange;
        Window._componentDimensions.maxHeight._attributes[0] *= 1 + heightChange;
        //Window._componentDimensions.maxHeight._attributes[0] *= 1 + widthChange;
        //Window._componentDimensions.maxWidth._attributes[0] *= 1 + heightChange;
        Window._componentDimensions.maxWidth._attributes[0] *= 1 + widthChange; */
        Window.setWindowDimension();
        Window.updateStyle();
    }

    importScript(src, type='text/javascript'){
        let script = document.createElement('script');
        script.src= src;
        script.type = type;
        document.head.appendChild(script);
    }


    updateStyle(){
        this._windowStyles.textContent="";


        let styleSheet = this._stylesheet.returnAll();
        let css='';
        for (let x in styleSheet){
            let name = styleSheet[x]._element._name;
            let styleSelector = styleSheet[x]._element.returnAll();
            if (styleSelector.length !== 0)
            {
                css += "name\n\t{\n".replace('name', name);
                for (let y in styleSelector){
                    let style =styleSelector[y]._element;
                    css += "\t name: attributes;\n".replace("name", style._name).replace('attributes', style.getAttributes().join(" "));

                }
                css += "}\n";
            }
        }

        this._windowStyles.textContent=css;
        this._documentHead.appendChild(this._windowStyles);
    }

    updateClasses(){
        let node = CLASSES._head;
        if (CLASSES._length !== 0){
            while(node._next !== CLASSES._tail){
                let Class = node._next._element;
                let nodeLevel2 = Class._head;
                while(nodeLevel2._next !== Class._tail){
                    try {
                        document.getElementById(nodeLevel2._next._element._id).classList.add(node._next._element._name);
                    }
                    catch (e) {}
                    nodeLevel2 = nodeLevel2._next

                }
                node = node._next;
            }
        }




    }

    updateEvents(){
        let events = EVENTS.returnAll();
        for(let x in events){
            let element = events[x]._element;
            let target = element._target;
            let eventType= element._eventType;
            let functionExp = element._functionExp;
            try {document.getElementById(target).addEventListener(eventType,functionExp)}
            catch (e) {
            }
        }
    }
    updateWindow(){

        let body = document.getElementsByTagName('body')[0];

        if(this._textContent !== "")
            body.appendChild(document.createTextNode(this._textContent));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    body.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    body.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }

        this.updateStyle();
        this.updateClasses();
        this.updateEvents();


    }

}


export class Anchor extends Component{
    constructor(id, href = ""){
        super('a',id);
        this._href = href;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.href = this._href;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}
export class Audio extends Component{
    /**
     *
     * @param id
     * @param src
     * @param poster
     * @param preload
     * @param {Boolean}controls
     * @param {Boolean}autoplay
     * @param {Boolean}loop
     * @returns {Audio}
     */
    constructor(id, src = "",preload=PRELOAD.NONE,controls,autoplay,loop){
        super('video',id);
        this._src = src;
        this._preload = preload;
        this._controls = controls;
        this._autoplay = autoplay;
        this._loop = loop;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.src = this._src;
        component.controls = this._controls;
        component.autoplay = this._autoplay;
        component.loop = this._loop;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}

export class BackgroundColor extends Style{

    /**
     *
     * @param {String}color
     */
    constructor(color){
        super();
        this._name ="background-color";
        this._color = new BaseColor(color);
        this._attributes = [0];
        this._attributes[0] = this._color.getHex();
        return this;
    }


    setRed(red){
        if (red instanceof Number && red >= 0 && red <= 255)
        {
            this._color.red(red);
            this._attributes = this._color.getHex();
            return this;
        }

    }
    setGreen(green){

        if (green instanceof Number && green >= 0 && green <= 255)
        {
            this._color.green(green);
            this._attributes = this._color.getHex();
        }
        return this;

    }
    setBlue(blue){

        if (blue instanceof Number && blue >= 0 && blue <= 255)
        {
            this._color.blue(blue);
            this._attributes = this._color.getHex();
        }
        return this;

    }
    setHue(hue){

        if (hue instanceof Number && hue >= 0 && hue <= 100)
        {
            this._color.hue(hue);
            this._attributes = this._color.getHex();
        }
        return this;

    }
    setSaturation(sat){

        if (sat instanceof Number && sat >= 0 && sat <= 100)
        {
            this._color.saturation(sat);
            this._attributes = this._color.getHex();
        }
        return this;

    }

    setLightness(light){

        if (light instanceof Number && light >= 0 && light <= 100)
        {
            this._color.lightness(light);
            this._attributes = this._color.getHex();
        }
        return this;

    }
    setBrightness(bright){

        if (bright instanceof Number && bright >= 0 && bright <= 100)
        {
            this._color.brightness(bright);
            this._attributes = this._color.getHex();
        }
        return this;
    }
    setHex(hex){


        if (hex instanceof String)
        {
            this._color.hex(hex);
            this._attributes = this._color.getHex();
        }
        return this;
    }
    getAttributes(){
        let color= [];
        for (let x = 0; x < 1; x++) {
            color[x] = this._attributes[x];
            //else  clear[x] = this._attributes[x]
        }
        return color;
    }

}export class BackgroundImage extends Style {



    /**
     *
     * @param url
     */
    constructor(url) {
        super();
        this. _attributes = [0];
        this._attributes[0]='url(\"' + url + '\")';
        this._name ="background-image";
        this._name ="background-image";
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setStyle(value) {
        this._attributes[0]='url(\"' + value + '\")';
        return this;
    }

    getAttributes(){
        let urls = [];
        for (let x = 0; x < 1; x++) {
            urls[x] = this._attributes[x];
            //else  urls[x] = this._attributes[x]
        }
        return urls;
    }
}


const Events = {
    RGB_UPDATED : 'RGBUpdated',
    HSL_UPDATED : 'HSLUpdated',
    HSV_UPDATED : 'HSVUpdated',
    HEX_UPDATED : 'HexUpdated',
    INT_UPDATED : 'IntUpdated'
};

export class BaseColor{




    constructor(color){
        this._value = 0;
        this._hex = '#000000';
        this._red = 0;  // 0 - 255
        this._green = 0;  // 0 - 255
        this._blue = 0;  // 0 - 255
        this._hue = 0;  // 0 - 360
        this._saturation = 0;  // 0 - 100
        this._lightness = 0;  // 0 - 100
        this._brightness = 0;  // 0 - 100
        this. _alpha = 1;  // 0 - 1

        this.output = 0;
        this.namedColors = {
            'transparent':'rgba(0, 0, 0, 0)','aliceblue':'#F0F8FF','antiquewhite':'#FAEBD7','aqua':'#00FFFF','aquamarine':'#7FFFD4',
            'azure':'#F0FFFF','beige':'#F5F5DC','bisque':'#FFE4C4','black':'#000000','blanchedalmond':'#FFEBCD','blue':'#0000FF','blueviolet':'#8A2BE2',
            'brown':'#A52A2A','burlywood':'#DEB887','cadetblue':'#5F9EA0','chartreuse':'#7FFF00','chocolate':'#D2691E','coral':'#FF7F50',
            'cornflowerblue':'#6495ED','cornsilk':'#FFF8DC','crimson':'#DC143C','cyan':'#00FFFF','darkblue':'#00008B','darkcyan':'#008B8B','darkgoldenrod':'#B8860B',
            'darkgray':'#A9A9A9','darkgrey':'#A9A9A9','darkgreen':'#006400','darkkhaki':'#BDB76B','darkmagenta':'#8B008B','darkolivegreen':'#556B2F',
            'darkorange':'#FF8C00','darkorchid':'#9932CC','darkred':'#8B0000','darksalmon':'#E9967A','darkseagreen':'#8FBC8F','darkslateblue':'#483D8B',
            'darkslategray':'#2F4F4F','darkslategrey':'#2F4F4F','darkturquoise':'#00CED1','darkviolet':'#9400D3','deeppink':'#FF1493','deepskyblue':'#00BFFF',
            'dimgray':'#696969','dimgrey':'#696969','dodgerblue':'#1E90FF','firebrick':'#B22222','floralwhite':'#FFFAF0','forestgreen':'#228B22',
            'fuchsia':'#FF00FF','gainsboro':'#DCDCDC','ghostwhite':'#F8F8FF','gold':'#FFD700','goldenrod':'#DAA520','gray':'#808080','grey':'#808080',
            'green':'#008000','greenyellow':'#ADFF2F','honeydew':'#F0FFF0','hotpink':'#FF69B4','indianred':'#CD5C5C','indigo':'#4B0082','ivory':'#FFFFF0',
            'khaki':'#F0E68C','lavender':'#E6E6FA','lavenderblush':'#FFF0F5','lawngreen':'#7CFC00','lemonchiffon':'#FFFACD','lightblue':'#ADD8E6',
            'lightcoral':'#F08080','lightcyan':'#E0FFFF','lightgoldenrodyellow':'#FAFAD2','lightgray':'#D3D3D3','lightgrey':'#D3D3D3','lightgreen':'#90EE90',
            'lightpink':'#FFB6C1','lightsalmon':'#FFA07A','lightseagreen':'#20B2AA','lightskyblue':'#87CEFA','lightslategray':'#778899',
            'lightslategrey':'#778899','lightsteelblue':'#B0C4DE','lightyellow':'#FFFFE0','lime':'#00FF00','limegreen':'#32CD32','linen':'#FAF0E6',
            'magenta':'#FF00FF','maroon':'#800000','mediumaquamarine':'#66CDAA','mediumblue':'#0000CD','mediumorchid':'#BA55D3','mediumpurple':'#9370D8',
            'mediumseagreen':'#3CB371','mediumslateblue':'#7B68EE','mediumspringgreen':'#00FA9A','mediumturquoise':'#48D1CC','mediumvioletred':'#C71585',
            'midnightblue':'#191970','mintcream':'#F5FFFA','mistyrose':'#FFE4E1','moccasin':'#FFE4B5','navajowhite':'#FFDEAD','navy':'#000080','oldlace':'#FDF5E6',
            'olive':'#808000','olivedrab':'#6B8E23','orange':'#FFA500','orangered':'#FF4500','orchid':'#DA70D6','palegoldenrod':'#EEE8AA',
            'palegreen':'#98FB98','paleturquoise':'#AFEEEE','palevioletred':'#D87093','papayawhip':'#FFEFD5','peachpuff':'#FFDAB9','peru':'#CD853F',
            'pink':'#FFC0CB','plum':'#DDA0DD','powderblue':'#B0E0E6','purple':'#800080','red':'#FF0000','rosybrown':'#BC8F8F','royalblue':'#4169E1',
            'saddlebrown':'#8B4513','salmon':'#FA8072','sandybrown':'#F4A460','seagreen':'#2E8B57','seashell':'#FFF5EE','sienna':'#A0522D','silver':'#C0C0C0',
            'skyblue':'#87CEEB','slateblue':'#6A5ACD','slategray':'#708090','slategrey':'#708090','snow':'#FFFAFA','springgreen':'#00FF7F',
            'steelblue':'#4682B4','tan':'#D2B48C','teal':'#008080','thistle':'#D8BFD8','tomato':'#FF6347','turquoise':'#40E0D0','violet':'#EE82EE'
        };

        // patterns
        this.isHex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
        this.isHSL = /^hsla?\((\d{0,3}),\s*(\d{1,3})%,\s*(\d{1,3})%(,\s*[01](\.\d+)*)\)$/;
        this.isRGB = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?\)$/;
        this.isPercent = /^\d+(\.\d+)*%$/;

        this.hexBit = /([0-9a-f])/gi;
        this.leadHex = /^#/;

        this.matchHSL = /^hsla?\((\d{0,3}),\s*(\d{1,3})%,\s*(\d{1,3})%(,\s*[01](\.\d+)*)\)$/;
        this.matchRGB = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?\)$/;


        this.HEX = 0;  // toString returns hex: #ABC123
        this.RGB = 1;  // toString returns rgb: rgb(0, 100, 255)
        this.PRGB = 2;  // toString returns percent rgb: rgb(0%, 40%, 100%)
        this.RGBA = 3;  // toString returns rgba: rgba(0, 100, 255, 0.5)
        this.PRGBA = 4;  // toString returns percent rgba: rgba(0%, 40%, 100%, 0.5)
        this.HSL = 5;  // toString returns hsl: hsl(360, 50%, 50%)
        this.HSLA = 6;  // toString returns hsla: hsla(360, 50%, 50%, 0.5)
        this.listeners = {};

        this.subscribe(Events.RGB_UPDATED, this.RGBUpdated);
        this.subscribe(Events.HEX_UPDATED, this.HEXUpdated);
        this.subscribe(Events.HSL_UPDATED, this.HSLUpdated);
        this.subscribe(Events.HSV_UPDATED, this.HSVUpdated);
        this.subscribe(Events.INT_UPDATED, this.INTUpdated);
        this.parse(color);

    }


    absRound(number){
        return number << 0;
    };


    hue2rgb(a, b, c) {  // http://www.w3.org/TR/css3-color/#hsl-color
        if(c < 0) c += 1;
        if(c > 1) c -= 1;
        if(c < 1/6) return a + (b - a) * 6 * c;
        if(c < 1/2) return b;
        if(c < 2/3) return a + (b - a) * (2/3 - c) * 6;
        return a;
    };
    percentToValue(p){
        return this.isPercent.test(p) ? this.absRound(parseInt(p) * 2.55) : p;
    };

    parse(value){
        if(typeof value === 'undefined'){
            return this;
        }
        switch(true){
            case isFinite(value) :
                return this.value(value);
            case (value instanceof BaseColor) :
                return this.copy(value);
            case this.isHex.test(value) :
                let  stripped = value.replace(this.leadHex, '');
                if(stripped.length === 3) {
                    stripped = stripped.replace(this.hexBit, '$1$1');
                }
                return this.value(parseInt(stripped, 16));
            case this.isRGB.test(value) :
                let parts = value.match(this.matchRGB);
                this.red(this.percentToValue(parts[1]));
                this.green(this.percentToValue(parts[2]));
                this.blue(this.percentToValue(parts[3]));
                this.alpha(parseInt(parts[4]) || 1);
                return this.value();
            case this.isHSL.test(value) :  // http://www.w3.org/TR/css3-color/#hsl-color
                parts = value.match(this.matchHSL);
                this.hue(parseInt(parts[1]));
                this.saturation(parseInt(parts[2]));
                this.lightness(parseInt(parts[3]));
                this.alpha(parseInt(parts[4]) || 1);
                return this.value();
            case (this.namedColors.hasOwnProperty(value)) :
                value = this.namedColors[value];
                stripped = value.replace(this.leadHex, '');
                return this.value(parseInt(stripped, 16));
            case (typeof value === 'object') :
                return this.set(value);
        }
        return this;
    };

    clone(){
        return new Color(this.value());
    };

    copy(color){
        return this.set(color.value());
    };

    set(key, value){
        if(arguments.length === 1){
            if(typeof key === 'object'){
                for( let p in key){
                    if(typeof this[p] === 'function'){
                        this[p](key[p]);
                    }
                }
            } else if(isFinite(key)){
                this.value(key);
            }
        } else if(typeof this[key] === 'function'){
            this[key](value);
        }
        return this;
    };

    toValue(){
        return this._value;
    };
    interpolate(v, f){
        if(!(v instanceof Color)){
            v = new Color(v);
        };
        this._red = this._red + (v._red - this._red) * f;
        this._green = this._green + (v._green - this._green) * f;
        this._blue = this._blue + (v._blue - this._blue) * f;
        this.broadcast(Event.RGB_UPDATED);
        return this;
    };

    RGB2HSL(){

        let r = this._red / 255;
        let  g = this._green / 255;
        let  b = this._blue / 255;

        let  max = Math.max(r, g, b);
        let  min = Math.min(r, g, b);
        let  l = (max + min) / 2;
        let  v = max;

        if(max === min) {
            this._hue = 0;
            this._saturation = 0;
            this._lightness = this.absRound(l * 100);
            this._brightness = this.absRound(v * 100);
            return;
        };

        let  d = max - min;
        let  s = d / ( ( l <= 0.5) ? (max + min) : (2 - max - min) );
        let  h = ((max === r)
            ? (g - b) / d + (g < b ? 6 : 0)
            : (max === g)
                ? ((b - r) / d + 2)
                : ((r - g) / d + 4)) / 6;

        this._hue = this.absRound(h * 360);
        this._saturation = this.absRound(s * 100);
        this._lightness = this.absRound(l * 100);
        this._brightness = this.absRound(v * 100);
    };
    HSL2RGB(){
        let h = this._hue / 360;
        let s = this._saturation / 100;
        let l = this._lightness / 100;
        let q = l < 0.5    ? l * (1 + s) : (l + s - l * s);
        let  p = 2 * l - q;
        this._red = this.absRound(this.hue2rgb(p, q, h + 1/3) * 255);
        this._green = this.absRound(this.hue2rgb(p, q, h) * 255);
        this._blue = this.absRound(this.hue2rgb(p, q, h - 1/3) * 255);
    };
    HSV2RGB(){  // http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        let h = this._hue / 360;
        let s = this._saturation / 100;
        let  v = this._brightness / 100;
        let  r = 0;
        let  g = 0;
        let b = 0;
        let i = this.absRound(h * 6);
        let  f = h * 6 - i;
        let  p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);
        switch(i % 6){
            case 0 :
                let r = v, g = t, b = p;
                break;
            case 1 :
                r = q, g = v, b = p;
                break;
            case 2 :
                r = p, g = v, b = t;
                break;
            case 3 :
                r = p, g = q, b = v;
                break;
            case 4 :
                r = t, g = p, b = v
                break;
            case 5 :
                r = v, g = p, b = q;
                break;
        }
        this._red = this.absRound(r * 255);
        this._green = this.absRound(g * 255);
        this._blue = this.absRound(b * 255);
    };

    INT2HEX(){
        let x = this._value.toString(16);
        x = '000000'.substr(0, 6 - x.length) + x;
        this._hex = '#' + x.toUpperCase();
    };
    INT2RGB(){
        this._red = this._value >> 16;
        this._green = (this._value >> 8) & 0xFF;
        this._blue = this._value & 0xFF;
    };
    HEX2INT(){
        this._value = parseInt(this._hex, 16);
    };
    RGB2INT(){
        this._value = (this._red << 16 | (this._green << 8) & 0xffff | this._blue);
    };
    RGBUpdated(){
        this.RGB2INT();  // populate INT values
        this.RGB2HSL();  // populate HSL values
        this.INT2HEX();  // populate HEX values
    };
    HSLUpdated(){
        this.HSL2RGB();  // populate RGB values
        this.RGB2INT();  // populate INT values
        this.INT2HEX();  // populate HEX values
    };
    HSVUpdated(){
        this.HSV2RGB();  // populate RGB values
        this.RGB2INT();  // populate INT values
        this.INT2HEX();  // populate HEX values
    };
    HEXUpdated(){
        this.HEX2INT();  // populate INT values
        this.INT2RGB();  // populate RGB values
        this.RGB2HSL();  // populate HSL values
    };
    INTUpdated(){
        this.INT2RGB();  // populate RGB values
        this.RGB2HSL();  // populate HSL values
        this.INT2HEX();  // populate HEX values
    };



    value(value){
        return this._handle('_value', value, Events.INT_UPDATED);
    };

    hex(value){
        return this._handle('_hex', value, Events.HEX_UPDATED);
    };

    red(value){
        return this._handle('_red', value, Events.RGB_UPDATED);
    };
    green(value){
        return this._handle('_green', value, Events.RGB_UPDATED);
    };
    blue(value){
        return this._handle('_blue', value, Events.RGB_UPDATED);
    };

    hue(value){
        return this._handle('_hue', value, Events.HSL_UPDATED);
    };
    saturation(value){
        return this._handle('_saturation', value, Events.HSL_UPDATED);
    };
    lightness(value){
        return this._handle('_lightness', value, Events.HSL_UPDATED);
    };

    brightness(value){
        return this._handle('_brightness', value, Events.HSV_UPDATED);
    };

    alpha(value){
        return this._handle('_alpha', value);
    };

    _handle(prop, value, event){
        if(typeof this[prop] !== 'undefined'){
            if(typeof value !== 'undefined'){
                if(value !== this[prop]){
                    this[prop] = value;
                    if(event){
                        this.broadcast(event);
                    }
                }
            }
        }
        return this[prop];
    };

    // convert to CSS values
    getHex(){
        return this._hex;
    };
    getRGB(){
        let  components = [this.absRound(this._red), this.absRound(this._green), this.absRound(this._blue)];
        return 'rgb(' + components.join(', ') + ')';
    };
    getPRGB(){
        let  components = [this.absRound(this._red / 255) + '%', this.absRound(this._green / 255) + '%', this.absRound(this._blue / 255) + '%'];
        return 'rgb(' + components.join(', ') + ')';
    };
    getRGBA(){
        let   components = [this.absRound(this._red), this.absRound(this._green), this.absRound(this._blue), this._alpha];
        return 'rgba(' + components.join(', ') + ')';
    };
    getPRGBA(){
        let components = [this.absRound(this._red / 255) + '%', this.absRound(this._green / 255) + '%', this.absRound(this._blue / 255) + '%', this._alpha];
        return 'rgba(' + components.join(', ') + ')';
    };
    getHSL(){
        let  components = [this.absRound(this._hue), this.absRound(this._saturation) + '%', this.absRound(this._lightness) + '%'];
        return 'hsl(' + components.join(', ') + ')';
    };
    getHSLA(){
        let components = [this.absRound(this._hue), this.absRound(this._saturation) + '%', this.absRound(this._lightness) + '%', this._alpha];
        return 'hsla(' + components.join(', ') + ')';
    };

    format(string){
        let  tokens = {
            r : this._red,
            g : this._green,
            b : this._blue,
            h : this._hue,
            s : this._saturation,
            l : this._lightness,
            v : this._brightness,
            a : this._alpha,
            x : this._hex,
            i : this._value
        };
        for( let token in tokens){
            string = string.split('%' + token + '%').join(tokens[token]);
        };
        return string;
    };


    toString(){
        switch(this.output){
            case 0 :  // Color.HEX
                return this.getHex();
            case 1 :  // Color.RGB
                return this.getRGB();
            case 2 :  // Color.PRGB
                return this.getPRGB();
            case 3 :  // Color.RGBA
                return this.getRGBA();
            case 4 :  // Color.PRGBA
                return this.getPRGBA();
            case 5 :  // Color.HSL
                return this.getHSL();
            case 6 :  // Color.HSLA
                return this.getHSLA();
        };
    };

    // Event Management
    isSubscribed(type){
        return this.listeners[type] != null;
    };
    subscribe(type, callback){
        if(!this.isSubscribed(type)) {
            this.listeners[type] = [];
        };
        this.listeners[type].push(callback);
    };
    unsubscribe(type, callback){
        if(!this.isSubscribed(type)) {
            return;
        }
        let  stack = this.listeners[type];
        let  len = stack.length;
        for( i = 0; i < l; i++){
            if(stack[i] === callback){
                stack.splice(i, 1);
                return this.unsubscribe(type, callback);
            }
        }
    }
    broadcast(type, params){
        if(!this.isSubscribed(type)) {
            return;
        }
        let stack = this.listeners[type];
        let l = stack.length;
        for( let i = 0; i < l; i++) {
            stack[i].apply(this, params);
        }
    };

}
export class Border extends Style{



    /**
     *
     * @param {BorderWidth}width
     * @param {BorderStyle}style
     * @param {BorderColor}color
     */
    constructor(width = BORDERWIDTH.THICK,style =BORDERSTYLE.DOTTED,color="BLACK"){
        super();
        this._name = "border";
        this._attributes=[0,0,0];
        this._attributes[0]=width;
        this._attributes[1]=style;
        this._attributes[2]=color;
        return this;
    }

    /**
     *
     * @param width
     */
    setWidth(width) {
        this._attributes[0]=width;
        return this;
    }

    /**
     *
     * @param style
     */
    setStyle(style) {
        this._attributes[1]=style;
        return this;
    }

    /**
     *
     * @param color
     */
    setColor(color) {
        this._attributes[2]=color;
        return this;
    }

    setBorder(){


    }
    getAttributes(){
        // To implement Array Copy
        return this._attributes;
    }

}
export class BorderCollapse extends Style {
    /**
     *
     * @param collapse
     */
    constructor(collapse = BORDERCOLLAPSE.SEPARATE) {
        super();
        this._name ="border-collapse";
        this._attributes = [0];
        this._attributes[0]=collapse;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setCollapse(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let style = [];
        for (let x = 0; x < 1; x++) {
            style[x] = this._attributes[x];
            //else  style[x] = this._attributes[x]
        }
        return style;
    }
}
export class BorderColor {


    /**
     *
     * @param color
     */
    constructor(color = "#000000") {
        this._color = [0,0,0,0];
        let x = 0;
        for(x; x < 4; x++)
            this._color[x] = color;
    }

    /**
     *
     * @param {number}value
     */
    set color(value) {
        let x = 0;
        for(x; x < 4; x++){
            if (this._color[x] === 0)
                this._color[x] = color;
        }
    }

    /**
     *
     * @param {number}value
     */
    set top(value) {
        this._color[0] = value;
    }

    /**
     *
     * @param {number}value
     */
    set right(value) {
        this._color[1] = value;
    }

    /**
     *
     * @param {number}value
     */
    set bottom(value) {
        this._color[2] = value;
    }

    /**
     *
     * @param {number}value
     */
    set left(value) {
        this._color[3] = value;
    }

    toString(){
        return this._color.join(" ")
    }



}

export class BorderRadius extends Style {



    /**
     *
     * @param radius
     * @param unit
     */
    constructor(radius = 0,unit = _UNITS.PERCENTILE) {
        super();
        this._name ="border-radius";
        this._attributes = [0];
        this._attributes[0] = radius;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setRadius(value) {
        this._attributes[0] = value;
        return this;
    }

    getAttributes(){
        let radius = [];
        for (let x = 0; x < 1; x++) {
            if(this._attributes[x] !== 'auto')
                radius[x] = "" + this._attributes[x] + this._unit;
            else
                radius[x] = this._attributes[x];
        }
        return radius
    }
}
export class BorderSpacing extends Style {
    /**
     *
     * @param horizontal
     * @param vertical
     * @param unit
     */
    constructor(horizontal =0, vertical =0,unit = _UNITS.PERCENTILE) {
        super();
        this._name ="border-spacing";
        this._attributes = [0, 0];
        this._attributes[0] = horizontal;
        this._attributes[1] = vertical;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setHorizontal(value) {
        this._attributes[0] = value;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setVertical(value) {
        this._attributes[1] = value;
        return this;
    }

    getAttributes(){
        let spacing = [];
        for (let x = 0; x < 2; x++) {
            if(this._attributes[x] !== 'auto')
                spacing[x] = "" + this._attributes[x] + this._unit;
            else
                spacing[x] = this._attributes[x];
        }
        return spacing
    }
}

export class BorderStyle{
    /**
     *
     * @param style
     */
    constructor(style = BORDERSTYLE.SOLID) {
        let x = 0;
        this._style= [0,0,0,0];
        for(x; x < 4; x++)
            this._style[x] = style;
    }

    /**
     *
     * @param {number}value
     */
    set style(value) {
        let x = 0;
        for(x; x < 4; x++){
            if (this._style[x] === 0)
                this._style[x] = style;
        }
    }

    /**
     *
     * @param {number}value
     */
    set top(value) {
        this._style[0] = value;
    }

    /**
     *
     * @param {number}value
     */
    set right(value) {
        this._style[1] = value;
    }

    /**
     *
     * @param {number}value
     */
    set bottom(value) {
        this._style[2] = value;
    }

    /**
     *
     * @param {number}value
     */
    set left(value) {
        this._style[3] = value;
    }

    toString(){
        return this._style.join(" ")
    }

}
export class BorderWidth extends Style{
    /**
     *
     * @param {number}width
     */
    constructor(width=5) {
        super();
        let x = 0;
        this._attributes =[0,0,0,0];
        for(x; x < 4; x++)
            this._attributes[x] = width;
        this._unit = _UNITS.PX
    }

    /**
     *
     * @param {number}value
     */
    set width(value) {
        let x = 0;
        for(x; x < 4; x++){
            if (this._attributes[x] === 0)
                this._attributes[x] = value;
        }
    }

    /**
     *
     * @param {number}value
     */
    set top(value) {
        this._attributes[0] = value;
    }

    /**
     *
     * @param {number}value
     */
    set right(value) {
        this._attributes[1] = value;
    }

    /**
     *
     * @param {number}value
     */
    set bottom(value) {
        this._attributes[2] = value;
    }

    /**
     *
     * @param {number}value
     */
    set left(value) {
        this._attributes[3] = value;
    }

    /**
     *
     * @param {string}value
     */
    set unit(value) {
        if (value in _UNITS)this._unit = value;
    }

    toString(){
        let width=[];
        for(let x = 0; x<4; x++){
            if(this._attributes[x] instanceof Number) width[x] = ""+this._attributes[x]+this._unit;
            else if(this._attributes[x] instanceof _UNITS) width[x] = this._attributes[x]
        }
        return this._attributes.join(" ")
    }


}
export class BottomBorder extends Style{

    /**
     *
     * @param {BorderWidth}width
     * @param {BorderStyle}style
     * @param {BorderColor}color
     * @param unit
     */
    constructor(width = BORDERWIDTH.THICK,style =BORDERSTYLE.SOLID,color="BLACK", unit= _UNITS.PERCENTILE){
        super();
        this._name = "border-bottom";
        this._attributes=[0,0,0];
        this._attributes[0]=width;
        this._attributes[1]=style;
        this._attributes[2]=color;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param width
     */
    setWidth(width) {
        this._attributes[0]=width;
        return this;
    }

    /**
     *
     * @param style
     */
    setStyle(style) {
        this._attributes[1]=style;
        return this;
    }

    /**
     *
     * @param color
     */
    setColor(color) {
        this._attributes[2]=color;
        return this;
    }

    getAttributes(){
        let border = [];
        for (let x = 0; x < 3; x++) {
            if(typeof this._attributes[x] === 'number')
                border[x] = "" + this._attributes[x] + this._unit;
            else
                border[x] = this._attributes[x];
        }
        return border
    }

}

export class Button extends Component{


    /**
     *
     * @param id
     * @param name
     * @returns {Button}
     */
    constructor(id, name=''){
        super('button',id);
        this._inputName = name;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}




export class CheckBox extends Component{

    /**
     *
     * @param id
     * @param name
     * @param value
     * @param checked
     * @returns {CheckBox}
     */
    constructor(id, name='',value,checked){
        super('input',id);
        this._inputName = name;
        this._value = value;
        this._checked = checked;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'checkbox';
        component.value= this._value;
        component.checked= this._checked;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}
export class Class extends LinkedList{

    constructor(name){
        super(name);
        CLASSES.add(this);
        this._stylesheet = STYLESHEET;
        this._stylesheet.add(new StyleSelector('.'+this._name));
        return this;
    }


    addCustomStyle(style) {

        if (style instanceof Array) {
            for(let x in style)
                Class.addIndCustomStyle(this,style[x]);
        }
        else
            Class.addIndCustomStyle(this,style);
        return this;

    }

    static addIndCustomStyle(object,style){
        try {
            object._stylesheet.element('.'+object._name).add(style);

        }
        catch (e) {
            if (e instanceof NotFoundError)
            {
                object._stylesheet.add(new StyleSelector('.'+object._name));
                object._stylesheet.element('.'+object._name).add(style);

            }
        }
        return this;
    }

    addPseudoElement(pseudoElement,style){

        if (style instanceof Array) {
            for(let x in style)
                Class.addIndPseudoElement(this, pseudoElement, style[x]);
        }
        else
            Class.addIndPseudoElement(this, pseudoElement,style);
        return this;

    }

    static addIndPseudoElement(object,pseudoElement,style){
        try {
            object._stylesheet.element(object._name + pseudoElement).add(style);

        }
        catch (e) {
            if (e instanceof NotFoundError) {
                object._stylesheet.add(new StyleSelector(object._name + pseudoElement));
                object._stylesheet.element(object._name + pseudoElement).add(style);

            }
        }

    }
    addComponent(component){
        if (component instanceof Array){
            for(let x in component){
                this.add(component[x])
            }
        }
        else
            this.add(component);
        return this
    }

}export class Clear extends Style {
    /**
     *
     * @param {String}clear
     */
    constructor(clear = CLEAR.NONE) {
        super();
        this._name ="clear";
        this._attributes = [0];
        this._attributes[0]=clear;
    }

    /**
     *
     * @param {String}value
     */
    setClear(value) {
        this._attributes[0]=value;
    }

    getAttributes(){
        let clear = [];
        for (let x = 0; x < 1; x++) {
            clear[x] = this._attributes[x];
            //else  clear[x] = this._attributes[x]
        }
        return clear;
    }
}

export class Color extends Style{

    /**
     *
     * @param {String}color
     */
    constructor(color){
        super("color");
        this._color = new BaseColor(color);
        this._attributes[0] = this._color.getHex();
        return this;
    }


    setRed(red){
        if (red instanceof Number && red >= 0 && red <= 255)
        {
            this._color.red(red);
            this._attributes = this._color.getHex();
            return this;
        }

    }
    setGreen(green){

        if (green instanceof Number && green >= 0 && green <= 255)
        {
            this._color.green(green);
            this._attributes = this._color.getHex();
            return this;
        }

    }
    setBlue(blue){

        if (blue instanceof Number && blue >= 0 && blue <= 255)
        {
            this._color.blue(blue);
            this._attributes = this._color.getHex();
            return this;
        }

    }
    setHue(hue){

        if (hue instanceof Number && hue >= 0 && hue <= 100)
        {
            this._color.hue(hue);
            this._attributes = this._color.getHex();
            return this;
        }

    }
    setSaturation(sat){

        if (sat instanceof Number && sat >= 0 && sat <= 100)
        {
            this._color.saturation(sat);
            this._attributes = this._color.getHex();
            return this;
        }

    }

    setLightness(light){

        if (light instanceof Number && light >= 0 && light <= 100)
        {
            this._color.lightness(light);
            this._attributes = this._color.getHex();
            return this;
        }

    }
    setBrightness(bright){

        if (bright instanceof Number && bright >= 0 && bright <= 100)
        {
            this._color.brightness(bright);
            this._attributes = this._color.getHex();
            return this;
        }
    }
    setHex(hex){


        if (hex instanceof String)
        {
            this._color.hex(hex);
            this._attributes = this._color.getHex();
            return this;
        }
    }
    getAttributes(){
        let color= [];
        for (let x = 0; x < 1; x++) {
            color[x] = this._attributes[x];
            //else  clear[x] = this._attributes[x]
        }
        return color;
    }

}
export class Cursor extends Style {
    /**
     *
     * @param cursor
     */
    constructor(cursor = CURSOR.AUTO) {
        super();
        this._name ="cursor";
        this._attributes[0]=cursor;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setCursor(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let style = [];
        for (let x = 0; x < 1; x++) {
            style[x] = this._attributes[x];
            //else  style[x] = this._attributes[x]
        }
        return style;
    }
}

export class DateInput extends Component{

    /**
     *
     * @param id
     * @param name
     * @returns {DateInput}
     */
    constructor(id, name=''){
        super('input',id);
        this._inputName = name;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'date';
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}




export class TableDefinition extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('dd',id);
        return this;
    }

}
export class DefinitionList extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('dl',id);
        return this;
    }

}
export class DefinitionTerm extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('dt',id);
        return this;
    }

}
export class Division extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('div',id);
        return this;
    }

}
export class DropDown extends Component{
    /**
     *
     * @param id
     * @param name
     * @returns {DropDown}
     */
    constructor(id, name=''){
        super('select',id);
        this._inputName = name;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}
export class DropDownOption extends Component{

    /**
     *
     * @param id
     * @param value
     * @param selected
     * @returns {DropDownOption}
     */
    constructor(id,value,selected){
        super('option',id);
        this._value = value;
        this._selected = selected;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.value= this._value;
        component.selected= this._selected;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}
export class EmailInput extends Component{
    /**
     *
     * @param id
     * @param name
     * @returns {EmailInput}
     */
    constructor(id, name=''){
        super('input',id);
        this._inputName = name;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'email';
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}



export class EmptyCells extends Style {
    /**
     *
     * @param value
     */
    constructor(value = EMPTYCELLS.SHOW) {
        super();
        this._name ="empty-cells";
        this._attributes[0]=value;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setStyle(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let style = [];
        for (let x = 0; x < 1; x++) {
            style[x] = this._attributes[x];
            //else  style[x] = this._attributes[x]
        }
        return style;
    }
}
class Event {
    /**
     *
     * @param id
     * @param eventType
     * @param functionExp
     * @param target
     * @returns {Event}
     */
    constructor(id,eventType,functionExp,target){
        this._name =id;
        this._eventType = eventType;
        this._functionExp = functionExp;
        this._target = target;
        return this;
    }


    getId() {
        return this._name;
    }

    setId(value) {
        this._name = value;
        return this;
    }

    getEventType() {
        return this._eventType;
    }

    setEventType(value) {
        this._eventType = value;
        return this;
    }

    getFunctionExp() {
        return this._functionExp;
    }

    setFunctionExp(value) {
        this._functionExp = value;
        return this;
    }
}
export class Fieldset extends Component{

    /**
     *
     * @param id
     * @returns {Label}
     */
    constructor(id){
        super('fieldset',id);
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}




export class FileInput extends Component{
    /**
     *
     * @param id
     * @param name
     * @returns {FileInput}
     */
    constructor(id, name=''){
        super('input',id);
        this._inputName = name;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'file';
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}
export class FlashPlayer extends Component{
    /**
     *
     * @param id
     * @param location
     * @param width
     * @param height
     * @param minVersion
     * @returns {Video}
     */
    constructor(id,location,width,height,minVersion){
        super('div',id);
        this._location = location;
        this._width = width;
        this._height = height;
        this._minVersion = minVersion;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.appendChild(document.createTextNode('swfobject.embedSWF("' + this._location + '", "'+this._id + '", "'+ this._width + '", "'+this._height +  '", "'+this._minVersion + '")' ));
        document.head.appendChild(script);
        component.id=this._id;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}export class Float extends Style {

    /**
     *
     * @param {String}float
     */
    constructor(float = FLOAT.NONE) {
        super("float");
        this._attributes[0]=float;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setFloat(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let float = [];
        for (let x = 0; x < 1; x++) {
            float[x] = this._attributes[x];
            //else  float[x] = this._attributes[x]
        }
        return float;
    }
}
export class FontFamily extends Style {

    /**
     *
     * @param font1
     * @param font2
     * @param font3
     */
    constructor(font1 = FONT.SERIF  ,font2 = FONT.TIMES,font3 =FONT["TIMES NEW ROMAN"]) {
        super("font-family");
        this._attributes[0]=font1;
        this._attributes[1]=font2;
        this._attributes[2]=font3;
        return this;
    }

    /**
     *
     * @param {String}font
     */
    setFont1(font) {
        this._attributes[0]=font;
        return this;
    } /**
     *
     * @param {String}font
     */
    setFont2(font) {
        this._attributes[1]=font;
        return this;
    } /**
     *
     * @param {String}font
     */
    setFont3(font) {
        this._attributes[2]=font;
        return this;
    }

    getAttributes(){
        let font= [];
        for (let x = 0; x < 3; x++) {
            font[x] = this._attributes[x]+',';
            //else  position[x] = this._attributes[x]
        }
        return font;
    }
}
export class FontSize extends Style {

    /**
     *
     * @param {Number} size
     * @param {String}unit
     */
    constructor(size = 3, unit = _UNITS.PERCENTILE) {
        super("font-size");
        this._attributes[0]=size;
        this._unit=unit;
    }

    /**
     *
     * @param {String}value
     */
    setSize(value) {
        this._attributes[0]=value;
    }

    getAttributes(){
        let size = [];
        for (let x = 0; x < 1; x++) {
            size[x] = "" + this._attributes[x] + this._unit;
            //else  position[x] = this._attributes[x]
        }
        return size;
    }
}
export class FontStyle extends Style {

    /**
     *
     * @param {String}style
     */
    constructor(style = FONTSTYLE.NORMAL) {
        super("font-style");
        this._attributes[0]=style;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setStyle(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let style = [];
        for (let x = 0; x < 1; x++) {
            style[x] = this._attributes[x];
            //else  style[x] = this._attributes[x]
        }
        return style;
    }
}
export class FontWeight extends Style {

    /**
     *
     * @param {String}weight
     */
    constructor(weight = FONTWEIGHT.NORMAL) {
        super("font-weight");
        this._attributes[0]=weight;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setWeight(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let weight = [];
        for (let x = 0; x < 1; x++) {
            weight[x] = this._attributes[x];
            //else  weight[x] = this._attributes[x]
        }
        return weight;
    }
}

export class Form extends Component{
    /**
     *
     * @param id
     * @param action
     * @param method
     * @returns {Form}
     */
    constructor(id, action = "",method=''){
        super('form',id);
        this._action = action;
        this._method = method;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.action= this._action;
        component.method= this._method;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}
export class Heading1 extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('h1',id);
        return this;
    }

}
export class Heading2 extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('h2',id);
        return this;
    }

}
export class Heading3 extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('h3',id);
        return this;
    }

}
export class Heading4 extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('h4',id);
        return this;
    }

}
export class Heading5 extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('h5',id);
        return this;
    }

}
export class Heading6 extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('h6',id);
        return this;
    }

}export class Height extends Style{

    /**
     *
     * @param {Number}height
     * @param unit
     */
    constructor(height = 100, unit = _UNITS.PERCENTILE) {
        super("height");
        let x = 0;
        for (x; x < 1; x++)
            this._attributes[x] = height;
        this._unit = unit;
        return this;
    }


    /**
     *
     * @param height
     */
    setHeight(height) {
        this._attributes[0]=height;
        return this;
    }

    getAttributes(){
        let height = [];
        for (let x = 0; x < 1; x++) {
            height[x] = "" + this._attributes[x] + this._unit;
            //else  height[x] = this._attributes[x]
        }
        return height
    }
}

let a = new Height();
export class HiddenInput extends Component{

    /**
     *
     * @param id
     * @param name
     * @param value
     * @returns {HiddenInput}
     */
    constructor(id, name='',value){
        super('input',id);
        this._inputName = name;
        this._value = value;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'hidden';
        component.value= this._value;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}




export class HImage extends Component{
    constructor(id, src = "",alt= ""){
        super('img',id);
        this._src= src;
        this._alt = alt;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.src =this._src;
        component.alt = this._alt;
        if(this._class !== '')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }


}
export class ImageButton extends Component{
    /**
     *
     * @param id
     * @param name
     * @param src
     * @returns {ImageButton}
     */
    constructor(id, name='',src){
        super('input',id);
        this._inputName = name;
        this._src = src;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'image';
        component.src= this._src;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}




export class Label extends Component{
    /**
     *
     * @param id
     * @param name
     * @param For
     * @returns {Label}
     */
    constructor(id, name='',For){
        super('label',id);
        this._inputName = name;
        this._for = For;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.for= this._for;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}



export class LeftBorder extends Style{

    /**
     *
     * @param {BorderWidth}width
     * @param {BorderStyle}style
     * @param {BorderColor}color
     * @param unit
     */
    constructor(width = BORDERWIDTH.THICK,style =BORDERSTYLE.SOLID,color="BLACK", unit= _UNITS.PERCENTILE){
        super("border-left");
        this._attributes[0]=width;
        this._attributes[1]=style;
        this._attributes[2]=color;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param width
     */
    setWidth(width) {
        this._attributes[0]=width;
        return this;
    }

    /**
     *
     * @param style
     */
    setStyle(style) {
        this._attributes[1]=style;
        return this;
    }

    /**
     *
     * @param color
     */
    setColor(color) {
        this._attributes[2]=color;
        return this;
    }

    getAttributes(){
        let border = [];
        for (let x = 0; x < 3; x++) {
            if(typeof this._attributes[x] === 'number')
                border[x] = "" + this._attributes[x] + this._unit;
            else
                border[x] = this._attributes[x];
        }
        return border
    }

}

export class Legend extends Component{

    /**
     *
     * @param id
     * @returns {Legend}
     */
    constructor(id){
        super('legend',id);
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}



export class LetterSpacing extends Style {

    /**
     *
     * @param {String}spacing
     * @param unit
     */
    constructor(spacing = 1, unit = _UNITS.PERCENTILE) {
        super("letter-spacing");
        this._attributes[0]=spacing;
        this._unit=unit;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setSpacing(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let spacing = [];
        for (let x = 0; x < 1; x++) {
            spacing[x] = "" + this._attributes[x] + this._unit;
            //else  spacing[x] = this._attributes[x]
        }
        return spacing;
    }
}


export class ListItem extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('li',id);
        return this;
    }

}export class ListStyle extends Style {

    /**
     *
     * @param position
     */
    constructor(position = LISTSTYLEPOSITION.OUTSIDE) {
        super("list-style-position");
        this._attributes[0]=position;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setStyle(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let style = [];
        for (let x = 0; x < 1; x++) {
            style[x] = this._attributes[x];
            //else  style[x] = this._attributes[x]
        }
        return style;
    }
}
export class ListStyleImage extends Style {

    /**
     *
     * @param url
     */
    constructor(url) {
        super("list-style-image");
        this._attributes[0]='url(\"' + url + '\")';
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setStyle(value) {
        this._attributes[0]='url(\"' + value + '\")';
        return this;
    }

    getAttributes(){
        let urls = [];
        for (let x = 0; x < 1; x++) {
            urls[x] = this._attributes[x];
            //else  url[x] = this._attributes[x]
        }
        return urls;
    }
}
export class ListStylePosition extends Style {

    /**
     *
     * @param position
     */
    constructor(position = LISTSTYLEPOSITION.OUTSIDE) {
        super("list-style-position");
        this._attributes[0]=position;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setStyle(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let style = [];
        for (let x = 0; x < 1; x++) {
            style[x] = this._attributes[x];
            //else  style[x] = this._attributes[x]
        }
        return style;
    }
}
export class ListStyleType extends Style {


    /**
     *
     * @param styleType
     */
    constructor(styleType=LISTSTYLETYPE.NONE) {
        super("list-style-type");
        this._attributes[0]=styleType;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setStyle(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let style = [];
        for (let x = 0; x < 1; x++) {
            style[x] = this._attributes[x];
            //else  style[x] = this._attributes[x]
        }
        return style;
    }
}
export class Margin extends Style {
    /**
     *
     * @param {number}margin
     * @param unit
     */
    constructor(margin = 5, unit = _UNITS.PERCENTILE) {
        super("margin");
        let x = 0;
        for (x; x < 4; x++)
            this._attributes[x] = margin;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setMargin(value) {
        let x = 0;
        for (x; x < 4; x++) {
            if (this._attributes[x] === 0)
                this._attributes[x] = value;
        }
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setTop(value) {
        this._attributes[0] = value;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setRight(value) {
        this._attributes[1] = value;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setBottom(value) {
        this._attributes[2] = value;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setLeft(value) {
        this._attributes[3] = value;
        return this;
    }

    getAttributes(){
        let margin = [];
        for (let x = 0; x < 4; x++) {
            if(this._attributes[x] !== 'auto')
                margin[x] = "" + this._attributes[x] + this._unit;
            else
                margin[x] = this._attributes[x];
            //else  margin[x] = this._attributes[x]
        }
        return margin
    }
}
export class MaxHeight extends Style{

    /**
     *
     * @param {Number}maxHeight
     * @param unit
     */
    constructor(maxHeight = 100, unit = _UNITS.PERCENTILE) {
        super("max-height");
        let x = 0;
        for (x; x < 1; x++)
            this._attributes[x] = maxHeight;
        this._unit = unit
        return this;
    }
    /**
     *
     * @param maxHeight
     */
    setMaxHeight(maxHeight) {
        this._attributes[0]=maxHeight;
        return this;
    }

    getAttributes(){
        let maxHeight = [];
        for (let x = 0; x < 1; x++) {
            maxHeight[x] = "" + this._attributes[x] + this._unit;
            //else  maxHeight[x] = this._attributes[x]
        }
        return maxHeight
    }
}

export class MaxWidth extends Style{

    /**
     *
     * @param {Number}maxWidth
     * @param unit
     */
    constructor(maxWidth = 100, unit = _UNITS.PERCENTILE) {
        super("max-width");
        let x = 0;
        for (x; x < 1; x++)
            this._attributes[x] = maxWidth;
        this._unit = unit;
        return this;
    }
    /**
     *
     * @param maxWidth
     */
    setMaxWidth(maxWidth) {
        this._attributes[0]=maxWidth;
        return this;
    }

    getAttributes(){
        let maxWidth = [];
        for (let x = 0; x < 1; x++) {
            maxWidth[x] = "" + this._attributes[x] + this._unit;
            //else  maxWidth[x] = this._attributes[x]
        }
        return maxWidth
    }
}

export class MinHeight extends Style{

    /**
     *
     * @param {Number}minHeight
     * @param unit
     */
    constructor(minHeight = 100, unit = _UNITS.PERCENTILE) {
        super("min-height");
        let x = 0;
        for (x; x < 1; x++)
            this._attributes[x] = minHeight;
        this._unit = unit;
        return this;
    }
    /**
     *
     * @param minHeight
     */
    setMinHeight(minHeight) {
        this._attributes[0]=minHeight;
        return this;
    }

    getAttributes(){
        let minHeight = [];
        for (let x = 0; x < 1; x++) {
            minHeight[x] = "" + this._attributes[x] + this._unit;
            //else  minHeight[x] = this._attributes[x]
        }
        return minHeight
    }
}

export class MinWidth extends Style{

    /**
     *
     * @param {Number}minWidth
     * @param unit
     */
    constructor(minWidth = 100, unit = _UNITS.PERCENTILE) {
        super("min-width");
        let x = 0;
        for (x; x < 1; x++)
            this._attributes[x] = minWidth;
        this._unit = unit;
        return this;
    }
    /**
     *
     * @param minWidth
     */
    setMinWidth(minWidth) {
        this._attributes[0]=minWidth;
        return this;
    }

    getAttributes(){
        let minWidth = [];
        for (let x = 0; x < 1; x++) {
            minWidth[x] = "" + this._attributes[x] + this._unit;
            //else  minWidth[x] = this._attributes[x]
        }
        return minWidth
    }
}


export class MultipleSelectDropDown extends Component{

    /**
     *
     * @param id
     * @param name
     * @param size
     * @returns {MultipleSelectDropDown}
     */
    constructor(id, name='',size='3'){
        super('select',id);
        this._inputName = name;
        this._size =size;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.size= this._size;
        component.multiple = 'multiple';
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }


}export class NotFoundError extends Error{

    constructor(){
        super();
        this.name = "NotFound Error";
        this.message ="Object Not Found";
    }

}
export class OrderedList extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('ol',id);
        return this;
    }

}export class Overflow extends Style{

    /**
     *
     * @param {String}overflow
     */
    constructor(overflow = OVERFLOW.SCROLL){
        super("overflow");
        this._attributes[0] = overflow;
        return this;
    }

    /**
     *
     * @param overflow
     */
    setOverflow(overflow) {
        this._attributes[0]=overflow;
        return this;
    }

    getAttributes(){
        // To implement Array Copy
        return this._attributes;
    }

}
export class Padding extends Style {

    /**
     *
     * @param {number}padding
     * @param unit
     */
    constructor(padding = 5, unit = _UNITS.PERCENTILE) {
        super("padding");
        let x = 0;
        for (x; x < 4; x++)
            this._attributes[x] = padding;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    set padding(value) {
        let x = 0;
        for (x; x < 4; x++) {
            if (this._attributes[x] === 0)
                this._attributes[x] = value;
        }
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setTop(value) {
        this._attributes[0] = value;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setRight(value) {
        this._attributes[1] = value;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setBottom(value) {
        this._attributes[2] = value;
        return this;
    }

    /**
     *
     * @param {number}value
     */
    setLeft(value) {
        this._attributes[3] = value;
        return this;
    }

    getAttributes(){
        let padding = [];
        for (let x = 0; x < 4; x++) {
            if(this._attributes[x])
                padding[x] = "" + this._attributes[x] + this._unit;
            //else  padding[x] = this._attributes[x]
        }
        return padding
    }
}

export class Paragraph extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('p',id);
        return this;
    }

}
export class PasswordInput extends Component{

    /**
     *
     * @param id
     * @param name
     * @param maxLength
     * @returns {PasswordInput}
     */
    constructor(id, name='',maxLength){
        super('input',id);
        this._inputName = name;
        this._maxLength = maxLength;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'password';
        if (this._maxLength)
            component.maxLength= this._maxLength;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}export class Position extends Style {

    /**
     *
     * @param {String}position
     */
    constructor(position = POSITION.RELATIVE) {
        super();
        this._attributes[0]=position;
        this._name ="position";
        this._attributes = [0];
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setPosition(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let position = [];
        for (let x = 0; x < 1; x++) {
            position[x] = this._attributes[x];
            //else  position[x] = this._attributes[x]
        }
        return position;
    }
}
export class PositionBottom extends Style {

    /**
     *
     * @param {Number}bottom
     * @param unit
     */
    constructor(bottom = 0, unit=_UNITS.PX) {
        super("bottom");
        this._attributes[0]=bottom;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setPositionBottom(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let bottom = [];
        for (let x = 0; x < 1; x++) {
            bottom[x] = ""+this._attributes[x]+this._unit;
            //else  position[x] = this._attributes[x]
        }
        return bottom;
    }
}
export class PositionLeft extends Style {

    /**
     *
     * @param {Number}left
     * @param unit
     */
    constructor(left = 0, unit=_UNITS.PX) {
        super("left");
        this._attributes[0]=left;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setPositionLeft(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let left = [];
        for (let x = 0; x < 1; x++) {
            left[x] = ""+this._attributes[x]+this._unit;
            //else  position[x] = this._attributes[x]
        }
        return left;
    }
}
export class PositionRight extends Style {

    /**
     *
     * @param {Number}right
     * @param unit
     */
    constructor(right = 0, unit=_UNITS.PX) {
        super("right");
        this._attributes[0]=right;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setPositionRight(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let right = [];
        for (let x = 0; x < 1; x++) {
            right[x] = ""+this._attributes[x]+this._unit;
            //else  position[x] = this._attributes[x]
        }
        return right;
    }
}
export class PositionTop extends Style {

    /**
     *
     * @param {Number}top
     * @param unit
     */
    constructor(top = 0, unit=_UNITS.PX) {
        super("top");
        this._attributes[0]=top;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setPositionTop(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let top = [];
        for (let x = 0; x < 1; x++) {
            top[x] = ""+this._attributes[x]+this._unit;
            //else  position[x] = this._attributes[x]
        }
        return top;
    }
}

export class RadioButton extends Component{

    /**
     *
     * @param id
     * @param name
     * @param value
     * @param checked
     * @returns {RadioButton}
     */
    constructor(id, name='',value,checked){
        super('input',id);
        this._inputName = name;
        this._value = value;
        this._checked = checked;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'radio';
        component.value= this._value;
        component.checked= this._checked;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}export class RightBorder extends Style{

    /**
     *
     * @param {BorderWidth}width
     * @param {BorderStyle}style
     * @param {BorderColor}color
     * @param unit
     */
    constructor(width = BORDERWIDTH.THICK,style =BORDERSTYLE.SOLID,color="BLACK", unit= _UNITS.PERCENTILE){
        super("border-right");
        this._attributes[0]=width;
        this._attributes[1]=style;
        this._attributes[2]=color;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param width
     */
    setWidth(width) {
        this._attributes[0]=width;
        return this;
    }

    /**
     *
     * @param style
     */
    setStyle(style) {
        this._attributes[1]=style;
        return this;
    }

    /**
     *
     * @param color
     */
    setColor(color) {
        this._attributes[2]=color;
        return this;
    }

    getAttributes(){
        let border = [];
        for (let x = 0; x < 3; x++) {
            if(typeof this._attributes[x] === 'number')
                border[x] = "" + this._attributes[x] + this._unit;
            else
                border[x] = this._attributes[x];
        }
        return border
    }

}

export class SearchInput extends Component{


    /**
     *
     * @param id
     * @param name
     * @returns {EmailInput}
     */
    constructor(id, name=''){
        super('input',id);
        this._inputName = name;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'search';
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}




export class Source extends Component{

    /**
     *
     * @param id
     * @param {String}src
     * @param {String}type
     * @returns {Source}
     */
    constructor(id, src = "",type){
        super('source',id);
        this._src = src;
        this._type = type;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.src = this._src;
        component.type = this._type;
        component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }


}
export class SubmitButton extends Component{

    /**
     *
     * @param id
     * @param name
     * @param value
     * @returns {SubmitButton}
     */
    constructor(id, name='',value){
        super('input',id);
        this._inputName = name;
        this._value = value;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'submit';
        component.value= this._value;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}




export class Table extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('table',id);
        return this;
    }

}
export class TableBody extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('tbody',id);
        return this;
    }

}
export class TableData extends Component{

    /**
     *
     * @param {String}id
     * @param colSpan
     * @param rowSpan
     */
    constructor(id,colSpan=0,rowSpan){
        super('td',id);
        this._colSpan = colSpan;
        this._rowSpan = rowSpan;
        return this;
    }
    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.colSpan = this._colSpan;
        component.rowSpan = this._rowSpan;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }

}
export class TableFoot extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('tfoot',id);
        return this;
    }

}
export class TableHead extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('thead',id);
        return this;
    }

}
export class TableHeading extends Component{


    /**
     *
     * @param {String}id
     * @param colSpan
     * @param rowSpan
     */
    constructor(id,colSpan=0,rowSpan=0){
        super('th',id);
        this._colSpan = colSpan;
        this._rowSpan = rowSpan;
        return this;
    }
    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.colSpan = this._colSpan;
        component.rowSpan = this._rowSpan;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }

}
export class TableRow extends Component{


    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('tr',id);
        return this;
    }

}
export class HText {
    constructor(text) {
        this._textContent = text;
    }

}export class TextAlignment extends Style {

    /**
     *
     * @param {String}alignment
     */
    constructor(alignment = TEXTALIGNMENT.LEFT) {
        super("text-align");
        this._attributes[0]=alignment;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setTextAlignment(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let alignment = [];
        for (let x = 0; x < 1; x++) {
            alignment[x] = this._attributes[x];
            //else  alignment[x] = this._attributes[x]
        }
        return alignment;
    }
}

export class TextArea extends Component{
    /**
     *
     * @param id
     * @param name
     * @param cols
     * @param rows
     * @returns {TextArea}
     */
    constructor(id, name='',cols,rows){
        super('textarea',id);
        this._inputName = name;
        this._cols = cols;
        this._rows = rows;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.cols= this._cols;
        component.rows= this._rows;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}export class TextDecoration extends Style {
    /**
     *
     * @param {String}decoration
     */
    constructor(decoration = TEXTDECORATION.NONE) {
        super("text-decoration");
        this._attributes[0]=decoration;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setDecoration(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let decoration = [];
        for (let x = 0; x < 1; x++) {
            decoration[x] = this._attributes[x];
            //else  decoration[x] = this._attributes[x]
        }
        return decoration;
    }
}
export class TextIndent extends Style {

    /**
     *
     * @param {Number} indent
     * @param {String}unit
     */
    constructor(indent = 3, unit = _UNITS.PERCENTILE) {
        super("text-indent");
        this._attributes[0]=indent;
        this._unit=unit;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setIndent(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let indent = [];
        for (let x = 0; x < 1; x++) {
            indent[x] = "" + this._attributes[x] + this._unit;
            //else  position[x] = this._attributes[x]
        }
        return indent;
    }
}

export class TextInput extends Component{

    /**
     *
     * @param id
     * @param name
     * @param maxLength
     * @returns {TextInput}
     */
    constructor(id, name='',maxLength){
        super('input',id);
        this._inputName = name;
        this._maxLength = maxLength;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'text';
        if (this._maxLength)
            component.maxLength= this._maxLength;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}
export class NumberInput extends Component{

    /**
     *
     * @param id
     * @param name
     * @param maxLength
     * @returns {TextInput}
     */
    constructor(id, name='',maxLength){
        super('input',id);
        this._inputName = name;
        this._maxLength = maxLength;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'number';
        if (this._maxLength)
            component.maxLength= this._maxLength;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}


export class TextShadow extends Style {

    /**
     *
     * @param {Number}hDistance
     * @param {Number}vDistance
     * @param {Number}blur
     * @param {String}color
     * @param {String}unit
     */
    constructor(hDistance = 5,vDistance = 5, blur = 5, color = '#000000', unit = _UNITS.PX) {
        super("text-shadow");
        this._attributes[0] = hDistance;
        this._attributes[1] = vDistance;
        this._attributes[2] = blur;
        this._attributes[3] = color;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setTextShadow(value) {
        let x = 0;
        for (x; x < 4; x++) {
            if (this._attributes[x] === 0)
                this._attributes[x] = value;
        }
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setHDistance(value) {
        this._attributes[0] = value;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setVDistance(value) {
        this._attributes[1] = value;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setBlur(value) {
        this._attributes[2] = value;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setColor(value) {
        this._attributes[3] = value;
        return this;
    }


    getAttributes(){
        let textShadow = [];
        for (let x = 0; x < 3; x++) {
            textShadow[x] = "" + this._attributes[x] + this._unit;
            //else  textShadow[x] = this._attributes[x]
        }
        textShadow[3] =this._attributes[3];
        return textShadow
    }
}
export class Transform extends Style {

    /**
     *
     * @param {String}transform
     */
    constructor(transform = TEXTTRANSFORM.LOWERCASE) {
        super("text-transform");
        this._attributes[0]=transform;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setTransform(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let transform = [];
        for (let x = 0; x < 1; x++) {
            transform[x] = this._attributes[x];
            //else  transform[x] = this._attributes[x]
        }
        return transform;
    }
}
export class TopBorder extends Style{

    /**
     *
     * @param {BorderWidth}width
     * @param {BorderStyle}style
     * @param {BorderColor}color
     * @param unit
     */
    constructor(width = BORDERWIDTH.THICK,style =BORDERSTYLE.SOLID,color="BLACK", unit= _UNITS.PERCENTILE){
        super("border-top");
        this._attributes[0]=width;
        this._attributes[1]=style;
        this._attributes[2]=color;
        this._unit = unit;
        return this;
    }

    /**
     *
     * @param width
     */
    setWidth(width) {
        this._attributes[0]=width;
        return this;
    }

    /**
     *
     * @param style
     */
    setStyle(style) {
        this._attributes[1]=style;
        return this;
    }

    /**
     *
     * @param color
     */
    setColor(color) {
        this._attributes[2]=color;
        return this;
    }

    getAttributes(){
        let border = [];
        for (let x = 0; x < 3; x++) {
            if(typeof this._attributes[x] === 'number')
                border[x] = "" + this._attributes[x] + this._unit;
            else
                border[x] = this._attributes[x];
        }
        return border
    }

}

export class UnorderedList extends Component{

    /**
     *
     * @param {String}id
     */
    constructor(id){
        super('ul',id);
        return this;
    }

}
export class UrlInput extends Component{

    /**
     *
     * @param id
     * @param name
     * @returns {UrlInput}
     */
    constructor(id, name=''){
        super('input',id);
        this._inputName = name;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.name= this._inputName;
        component.type= 'url';
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}



export class VerticalAlignment extends Style {

    /**
     *
     * @param {String}alignment
     */
    constructor(alignment = VERTICALALIGNMENT.TEXTTOP) {
        super("vertical-alignment");
        this._attributes[0]=alignment;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setVerticalAlignment(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let alignment = [];
        for (let x = 0; x < 1; x++) {
            alignment[x] = this._attributes[x];
            //else  alignment[x] = this._attributes[x]
        }
        return alignment;
    }
}

export class Video extends Component{

    /**
     *
     * @param id
     * @param src
     * @param poster
     * @param preload
     * @param {Boolean}controls
     * @param {Boolean}autoplay
     * @param {Boolean}loop
     * @returns {Video}
     */
    constructor(id, src = "",poster="",preload=PRELOAD.NONE,controls,autoplay,loop){
        super('video',id);
        this._src = src;
        this._poster = poster;
        this._preload = preload;
        this._controls = controls;
        this._autoplay = autoplay;
        this._loop = loop;
        return this;
    }

    setComponents(){
        let component = this.createElement();
        if(this._textContent !== "")
            component.appendChild(document.createTextNode(this._textContent));
        component.id=this._id;
        component.src = this._src;
        component.poster = this._poster;
        component.controls = this._controls;
        component.autoplay = this._autoplay;
        component.loop = this._loop;
        if(this._class !== '.')
            component.classList.add(this._class.replace('.',''));
        let node = this._head;
        if (this._length !== 0){
            while(node._next !== this._tail){
                if(node._next._element instanceof HText)
                    component.appendChild(document.createTextNode(node._next._element._textContent));
                else if(node._next._element instanceof Component)
                    component.appendChild(node._next._element.setComponents());
                node = node._next;
            }
        }
        return component;
    }






}export class Width extends Style{


    /**
     *
     * @param {Number}width
     * @param unit
     */
    constructor(width = 100, unit = _UNITS.PERCENTILE) {
        super("width");
        let x = 0;
        for (x; x < 1; x++)
            this._attributes[x] = width;
        this._unit = unit;
        return this;
    }
    /**
     *
     * @param width
     */
    setWidth(width) {
        this._attributes[0]=width;
        return this;
    }

    getAttributes(){
        let width = [];
        for (let x = 0; x < 1; x++) {
            width[x] = "" + this._attributes[x] + this._unit;
            //else  width[x] = this._attributes[x]
        }
        return width
    }

}



export class WordSpacing extends Style {

    /**
     *
     * @param {String}spacing
     * @param unit
     */
    constructor(spacing = 1, unit = _UNITS.PERCENTILE) {
        super("word-spacing");
        this._attributes[0]=spacing;
        this._unit=unit;
        return this;
    }

    /**
     *
     * @param {String}value
     */
    setSpacing(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let spacing = [];
        for (let x = 0; x < 1; x++) {
            spacing[x] = "" + this._attributes[x] + this._unit;
            //else  spacing[x] = this._attributes[x]
        }
        return spacing;
    }
}
export class ZIndex extends Style {

    /**
     *
     * @param {String}zIndex
     */
    constructor(zIndex = 0) {
        super("z-index");
        this._attributes[0]=zIndex;
        return this;
    }

    /**
     *
     * @param {Number}value
     */
    setZIndex(value) {
        this._attributes[0]=value;
        return this;
    }

    getAttributes(){
        let zIndex = [];
        for (let x = 0; x < 1; x++) {
            zIndex[x] = this._attributes[x];
            //else  zIndex[x] = this._attributes[x]
        }
        return zIndex;
    }
}
