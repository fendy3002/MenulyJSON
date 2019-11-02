'use strict';

Blockly.logical_compare = new Blockly.Generator('logical_compare');

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
    let date_source = block.getFieldValue('date_source');
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
    let source = block.getFieldValue('source');
    let operation = block.getFieldValue('operation');
    let compare = block.getFieldValue('compare');
    return {
        $compare: [
            source,
            operation,
            compare
        ]
    };
};