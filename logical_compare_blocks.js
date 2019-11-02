'use strict';


Blockly.selectionArrow = function () { return Blockly.RTL ? "←" : "→"; };
Blockly.keyValueArrow = function () { return Blockly.RTL ? "⇐" : "⇒"; };


Blockly.Blocks['start'] = {
    init: function () {
        this.setColour(250);
        this.appendValueInput('json')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Eval")
            .setCheck(['s_boolean']);

        this.setDeletable(false);
    }
};

Blockly.Blocks['string'] = {
    init: function () {
        this.setColour(190);
        this.setOutput(true, ["string"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('"')
            .appendField(new Blockly.FieldTextInput(''), 'string_value')
            .appendField('"');
    }
};

Blockly.Blocks['number'] = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["number"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('')
            .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), "number_value");
    }
};

Blockly.Blocks['bool'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["boolean"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['true', "TRUE"],
                ['false', "FALSE"]
            ]), 'bool_value');
    }
};
Blockly.Blocks['s_boolean'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_boolean"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$boolean')
            .appendField(new Blockly.FieldDropdown([
                ['true', "TRUE"],
                ['false', "FALSE"]
            ]), 'bool_value');
    }
};

Blockly.Blocks['s_compare'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_boolean"]);

        this.appendValueInput('source')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("$compare")
            .setCheck(['s_prop']);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('')
            .appendField(new Blockly.FieldDropdown([
                ['Equal', "eq"],
                ['Not equal', "ne"],
                ['>', "gt"],
                ['>=', "gte"],
                ['<', "lt"],
                ['<=', "lte"],
                ['Start with', "starts_with"],
                ['End with', "ends_with"],
                ['Contains', "contains"],
                ['Regex', "regex"],
                ['In', "in"]
            ]), 'operation');

        this.appendValueInput('compare')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("")
            .setCheck([
                'string',
                'number',
                'boolean',
                's_boolean',
                's_prop',
                's_date',
            ]);
    }
};

Blockly.Blocks['s_prop'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_prop"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name');
    }
};
Blockly.Blocks['s_date'] = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["s_date"]);

        this.appendValueInput('date_source')
            .setCheck(['string', 's_prop'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('$date');
    }
};