const Member = require("../models/memberModel");

// Funktion til at formatere datoen til 'dd-mm-yyyy'
const formatDate = (date) => {
    const d = new Date(date);
    return (
        ("0" + d.getDate()).slice(-2) + "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear()
    );
};

// Create member
exports.createMember = async (req, res) => {
    try {
        const newMember = new Member({
            name: req.body.name,
            party: req.body.party,
            position: req.body.position,
            employmentDate: req.body.employmentDate
        });
        await newMember.save();
        res.redirect('/');
    } catch (err) {
        console.error("Error while creating member:", err);
        res.status(500).send("Error while creating member");
    }
};

// Get all members
exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        // Formatér employmentDate for hvert medlem
        const formattedMembers = members.map(member => ({
            ...member._doc, // Kopier eksisterende medlemsdata
            formattedDate: formatDate(member.employmentDate) // Tilføj den formaterede dato
        }));
        res.render('index', { members: formattedMembers });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error while getting all the members");
    }
};

// Update a member
exports.updateMember = async (req, res) => {
    try {
        await Member.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            party: req.body.party,
            position: req.body.position,
            employmentDate: req.body.employmentDate
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error while updating the member");
    }
};

// Delete member
exports.deleteMember = async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error while deleting member");
    }
};
