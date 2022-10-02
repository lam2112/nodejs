const Handlebars = require('handlebars');

module.exports = {
    sum: (a,b) => a+b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'icon-angle-down',
            asc: 'icon-sort-by-attributes',
            desc: 'icon-sort-by-attributes-alt'
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        };

        const icon = icons[sortType];
        const type = types[sortType];

        //https://handlebarsjs.com/examples/helper-safestring.html (bao ve code)
        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);
        
        const output = `<a href="${href}"><i class="${icon}"></i></a>`;

        return new Handlebars.SafeString(output);
    }
};  