export default {
    Mutation: {
        saveCharacter: (_, args, { cache }) => {
            cache.writeData({
                id: `Character:${args.key}`,
                data: {
                    name: `${args.name}`,
                    description: `${args.description}`
                }
            });
            return null;
        }
    }
};
