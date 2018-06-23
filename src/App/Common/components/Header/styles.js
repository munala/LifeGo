export const styles = theme => ({
  searchInput: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#676767',
    fontSize: 20,
    backgroundColor: '#E5E5E5',
    height: 48,
    maxWidth: 720,
    borderRadius: 4,
    paddingLeft: 12,
  },
  margin: {
    margin: theme.spacing.unit,
    cursor: 'pointer',
  },
});

export const otherStyles = {
  avatar: {
    marginLeft: 24,
    height: 48,
    width: 48,
    cursor: 'pointer',
  },
  signIn: {
    marginRight: 24,
  },
};
