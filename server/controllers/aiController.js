const AiAnalysis = require('../models/AiAnalysis');

const {analyzeRepairImage} = require('../services/aiService');

const analyzeImage = async (req, res) => {

    try {

        const { userId, imageUrl } = req.body;

        // AI analysis
        const aiResult =
            await analyzeRepairImage(imageUrl);

        // save analysis
        const analysis =
            await AiAnalysis.create({

                userId,
                imageUrl,

                problemDescription:
                aiResult.problemDescription,

                suggestedFix:
                aiResult.suggestedFix,
            });

        return res.status(201).json(analysis);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllAiAnalysis = async (req, res) => {
    try{
        const {id} = req.params;
        const AiResult = await AiAnalysis.find(
            {
                userId:
                id,
            }
        );

        if (AiResult.length === 0) {
            return res.status(404).json({
                message: "No AI analysis found",
            });
        }

        return res.status(200).json(AiResult);
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

module.exports = {
    analyzeImage,
getAllAiAnalysis,};