import { standardApi_Response } from "../../utils/_ApiResponseClass.js";
import { custom_Error } from "../../utils/_CustomErrorClass.js";
import { requestError_Handler } from "../../utils/_RequestWraper.js";
import { User } from "../../models/_User.model.js"

const getCurrentUser = requestError_Handler(async function (req, res, next) {
    const { userName } = req.params;

    if (!userName) throw new custom_Error(404, "User name didn't found");

    const channel = await User.aggregate([
        {
            $match: { userName: userName.toLowerCase() }
        },
        {
            // channels this user subscribed to
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            // people who subscribed to this user’s channel
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                channelsSubscribedToCount: { $size: "$subscribedTo" },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.LoggedInUser?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                userName: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ]);

    if (!channel?.length) throw new custom_Error(404, "channel not found");

    return res.status(200).json(
        new standardApi_Response(200, "Current User", channel[0])
    );
});

export { getCurrentUser };
