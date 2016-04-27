'use strict';

module.exports = function (processor) {
    processor.registerBlockType('customBlock', function (content, block, blockLine, blockContent) {
    	var title = 'script src="' + block.asset + '"></script>';
    	var result = content.replace(blockLine, title);

    	return result;
    });
};
