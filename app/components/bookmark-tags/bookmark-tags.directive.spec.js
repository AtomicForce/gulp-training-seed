describe('gt.components.bookmark-tags', function () {
    beforeEach(module('gt.components.bookmark-tags'));

    var directive;
    beforeEach(inject(function ($compile, $rootScope, directiveBuilder) {
        directive = directiveBuilder.$build('<bookmark-tags></bookmark-tags>');
    }));

    it('element should be null', function () {        
        expect(directive.element).toBeTruthy();
    });
});
