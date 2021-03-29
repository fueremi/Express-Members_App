const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const member = require('../../Member');

// Get all members
router.get('/', (req, res) => res.json(member));

// Get single member
router.get('/:id', (req, res) => {
  const found = member.some(member => member.id === parseInt(req.params.id))

  if (found) {
    res.send(member.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

// Create member
router.post('/', (req, res) => {
  const newNember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newNember.name || !newNember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  member.push(newNember);
  res.json(member);
});

// Update member
router.put('/:id', (req, res) => {
  const found = member.some(member => member.id === parseInt(req.params.id))

  if (found) {
    const updateMember = req.body;
    member.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: 'Member was updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const found = member.some(member => member.id === parseInt(req.params.id))

  if (found) {
    res.json({ msg: 'Member deleted', member: member.filter(member => member.id !== parseInt(req.params.id)) });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

module.exports = router;