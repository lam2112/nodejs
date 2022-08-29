
class NewsController {

    //GET /news
    index(req, res){
        res.render('news')
    }

    // GET /new/slut
    show(req, res){
        res.send('New detaoi')
    }

}

module.exports = new NewsController;

