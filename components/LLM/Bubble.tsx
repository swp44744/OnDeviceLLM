import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { ThemeContext, UserContext } from '@flyerhq/react-native-chat-ui';
import type { MessageType } from '@flyerhq/react-native-chat-ui';

interface BubbleProps {
  child: React.ReactNode;
  message: MessageType.Any;
}

const Bubble: React.FC<BubbleProps> = ({ child, message }: BubbleProps) => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const currentUserIsAuthor = user?.id === message.author.id;
  const { copyable, timings } = message.metadata || {};

  // Determine the container type (TouchableOpacity if copyable, View otherwise)
  const Container = copyable ? TouchableOpacity : View;

  const handlePress = () => {
    if (message.type === 'text') {
      Clipboard.setString(message.text);
    }
  };

  return (
    <Container
      style={{
        backgroundColor:
          currentUserIsAuthor && message.type !== 'image'
            ? theme.colors.primary
            : theme.colors.secondary,
        borderBottomLeftRadius: currentUserIsAuthor
          ? theme.borders.messageBorderRadius
          : 0,
        borderBottomRightRadius: currentUserIsAuthor
          ? 0
          : theme.borders.messageBorderRadius,
        borderRadius: theme.borders.messageBorderRadius,
        overflow: 'hidden',
      }}
      onPress={handlePress}
    >
      {child}
      {timings && (
        <Text
          style={{
            textAlign: 'right',
            color: '#ccc',
            paddingRight: 12,
            paddingBottom: 12,
            marginTop: -8,
            fontSize: 10,
          }}
        >
          {timings}
        </Text>
      )}
    </Container>
  );
};

export default Bubble;
