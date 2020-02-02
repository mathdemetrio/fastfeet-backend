import User from '../models/User';

class UserController {
  index() {}

  show() {}

  async store(req, res) {
    try {
      const userExists = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists!' });
      }
      const { name, email } = await User.create(req.body);
      return res.json({ name, email });
    } catch (error) {
      return res.status(500).send();
    }
  }

  update() {}

  delete() {}
}

export default new UserController();
