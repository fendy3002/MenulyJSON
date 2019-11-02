'use strict';

Blockly.logical_compare = new Blockly.Generator('logical_compare');

Blockly.logical_compare.toText = function (workspace) {
    let json_text = '';
    let top_blocks = workspace.getTopBlocks(false);
    for (let i in top_blocks) {
        let top_block = top_blocks[i];
        if (top_block.type == 'start') {
            return JSON.stringify(Blockly.logical_compare['start'](top_block), null, 2);
        }
    }
    return json_text;
};
Blockly.logical_compare['start'] = function (block) {
    let jsonValue = block.getInputTargetBlock('json');
    if (jsonValue) {
        let evaluated = Blockly.logical_compare[jsonValue.type](jsonValue);
        return evaluated;
    }
    return null;
};
Blockly.logical_compare['string'] = function (block) {
    let string_value = block.getFieldValue('string_value');
    return string_value;
};
Blockly.logical_compare['number'] = function (block) {
    let number_value = Number(block.getFieldValue('number_value'));
    return number_value;
};

Blockly.logical_compare['boolean'] = function (block) {
    let bool_value = block.getFieldValue('bool_value');
    return bool_value === "TRUE" ? true : false;
};
Blockly.logical_compare['s_boolean'] = function (block) {
    let bool_value = block.getFieldValue('bool_value');
    return bool_value === "TRUE" ?
        {
            $boolean: true
        } : {
            $boolean: false
        };
};

Blockly.logical_compare['s_date'] = function (block) {
    let date_source = block.getInput('date_source');
    return {
        $date: date_source
    };
};
Blockly.logical_compare['s_prop'] = function (block) {
    let prop_name = block.getFieldValue('prop_name');
    return {
        $prop: prop_name
    };
};
Blockly.logical_compare['s_compare'] = function (block) {
    let source = block.getInputTargetBlock('source');
    let operation = block.getFieldValue('operation');
    let compare = block.getInputTargetBlock('compare');

    let sourceValue = null;
    if(source){
        sourceValue = Blockly.logical_compare[source.type](source);
    }
    let compareValue = null;
    if(compare){
        compareValue = Blockly.logical_compare[compare.type](compare);
    }
    return {
        $compare: [
            sourceValue,
            operation,
            compareValue
        ]
    };
};