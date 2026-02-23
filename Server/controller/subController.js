const SUBJECT = require("../model/subjectModel");

const handleAddSubject = async (req, res) => {
    // return res.json({message : "Add Subject Work"})

    const { _id } = req.payload;

    if (req.body == undefined) {
        return res.status(400).json({ message: "details are mandatory to add subject" })
    }

    let { subject } = req.body;

    if (!subject) {
        return res.status(400).json({ message: "Input field cannot be empty" })
    }

    try {
        const stdSubject = await SUBJECT.find({ stdId: _id });

        const isStdSubject = stdSubject.find((detail) => detail.subject === subject);

        if (isStdSubject) {
            return res.status(400).json({ message: "you already added this subject" });
        }

        await SUBJECT.create({ subject, stdId: _id });
        return res.status(201).json({ message: `${subject} added for you` });

    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const handleGetAllSubject = async (req, res) => {
    try {
        const { _id } = req.payload;

        const allSubjects = await SUBJECT.find({ stdId: _id });
        return res.status(200).json({ allSubjects });
    }
    catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}

const handleRemoveSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await SUBJECT.deleteOne({ _id: id });
        return res.status(200).json({ message: "subject removed successfully" })
    }
    catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}

const handleUpdateSubject = async (req, res) => {
    try {

        if (req.body == undefined) {
            return res.status(400).json({ message: "details are mandatory to update a subject" });
        }

        const { subject, editId } = req.body;

        const isSubj = await SUBJECT.findOne({ subject: subject })

        if (isSubj) {
            return res.status(400).json({ message: "Subject is already present" });
        }

        if (!subject || !editId) {
            return res.status(400).json({ message: "All fields required" });
        }

        await SUBJECT.findByIdAndUpdate({ _id: editId }, { $set: { subject: subject } });
        return res.status(200).json({ message: "subject updated successfully" })

    }
    catch (error) {
        return res.status(500).json({ message: "inernal server error" })
    }
}

module.exports = { handleAddSubject, handleGetAllSubject, handleRemoveSubject, handleUpdateSubject };