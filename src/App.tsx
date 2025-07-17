import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Plus, Trophy, Users, Calendar, Target } from 'lucide-react'

interface Tournament {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  status: 'upcoming' | 'ongoing' | 'completed'
  userId: string
  createdAt: string
}

interface Team {
  id: string
  name: string
  shortName: string
  tournamentId: string
  userId: string
  createdAt: string
}

interface Player {
  id: string
  name: string
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper'
  teamId: string
  userId: string
  createdAt: string
}

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [activeTab, setActiveTab] = useState('tournaments')

  // Tournament form state
  const [tournamentForm, setTournamentForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  })

  // Team form state
  const [teamForm, setTeamForm] = useState({
    name: '',
    shortName: ''
  })

  // Player form state
  const [playerForm, setPlayerForm] = useState({
    name: '',
    role: 'batsman' as Player['role']
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Mock data for now since database creation failed
  useEffect(() => {
    if (user) {
      // Initialize with some sample data
      const sampleTournaments: Tournament[] = [
        {
          id: '1',
          name: 'Summer Cricket League 2024',
          description: 'Annual summer cricket tournament',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          status: 'ongoing',
          userId: user.id,
          createdAt: new Date().toISOString()
        }
      ]
      setTournaments(sampleTournaments)
    }
  }, [user])

  const handleCreateTournament = () => {
    if (!user || !tournamentForm.name) return

    const newTournament: Tournament = {
      id: Date.now().toString(),
      name: tournamentForm.name,
      description: tournamentForm.description,
      startDate: tournamentForm.startDate,
      endDate: tournamentForm.endDate,
      status: 'upcoming',
      userId: user.id,
      createdAt: new Date().toISOString()
    }

    setTournaments(prev => [...prev, newTournament])
    setTournamentForm({ name: '', description: '', startDate: '', endDate: '' })
  }

  const handleCreateTeam = () => {
    if (!user || !teamForm.name || !selectedTournament) return

    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamForm.name,
      shortName: teamForm.shortName || teamForm.name.substring(0, 3).toUpperCase(),
      tournamentId: selectedTournament.id,
      userId: user.id,
      createdAt: new Date().toISOString()
    }

    setTeams(prev => [...prev, newTeam])
    setTeamForm({ name: '', shortName: '' })
  }

  const handleCreatePlayer = () => {
    if (!user || !playerForm.name || !selectedTeam) return

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerForm.name,
      role: playerForm.role,
      teamId: selectedTeam.id,
      userId: user.id,
      createdAt: new Date().toISOString()
    }

    setPlayers(prev => [...prev, newPlayer])
    setPlayerForm({ name: '', role: 'batsman' })
  }

  const getTeamsForTournament = (tournamentId: string) => {
    return teams.filter(team => team.tournamentId === tournamentId)
  }

  const getPlayersForTeam = (teamId: string) => {
    return players.filter(player => player.teamId === teamId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Cricket Manager...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Cricket Score Manager</CardTitle>
            <CardDescription>
              Please sign in to manage your cricket tournaments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => blink.auth.login()} 
              className="w-full cricket-gradient"
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Cricket Score Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => blink.auth.logout()}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tournaments" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Tournaments</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Teams</span>
            </TabsTrigger>
            <TabsTrigger value="scoring" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Live Scoring</span>
            </TabsTrigger>
          </TabsList>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Tournaments</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="cricket-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Tournament
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Tournament</DialogTitle>
                    <DialogDescription>
                      Set up a new cricket tournament to manage teams and matches.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tournament-name">Tournament Name</Label>
                      <Input
                        id="tournament-name"
                        value={tournamentForm.name}
                        onChange={(e) => setTournamentForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Summer Cricket League 2024"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tournament-description">Description</Label>
                      <Textarea
                        id="tournament-description"
                        value={tournamentForm.description}
                        onChange={(e) => setTournamentForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the tournament"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={tournamentForm.startDate}
                          onChange={(e) => setTournamentForm(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={tournamentForm.endDate}
                          onChange={(e) => setTournamentForm(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCreateTournament} className="w-full cricket-gradient">
                      Create Tournament
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tournament.name}</CardTitle>
                      <Badge 
                        className={
                          tournament.status === 'ongoing' ? 'match-status-live' :
                          tournament.status === 'upcoming' ? 'match-status-upcoming' :
                          'match-status-completed'
                        }
                      >
                        {tournament.status}
                      </Badge>
                    </div>
                    <CardDescription>{tournament.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{tournament.startDate} - {tournament.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{getTeamsForTournament(tournament.id).length} teams</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => {
                        setSelectedTournament(tournament)
                        setActiveTab('teams')
                      }}
                    >
                      Manage Teams
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {tournaments.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tournaments yet</h3>
                <p className="text-gray-600 mb-4">Create your first tournament to get started</p>
              </div>
            )}
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
                {selectedTournament && (
                  <p className="text-gray-600">Managing teams for {selectedTournament.name}</p>
                )}
              </div>
              {selectedTournament && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cricket-gradient">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Team</DialogTitle>
                      <DialogDescription>
                        Add a team to {selectedTournament.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="team-name">Team Name</Label>
                        <Input
                          id="team-name"
                          value={teamForm.name}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Mumbai Warriors"
                        />
                      </div>
                      <div>
                        <Label htmlFor="team-short">Short Name (3 letters)</Label>
                        <Input
                          id="team-short"
                          value={teamForm.shortName}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, shortName: e.target.value.toUpperCase() }))}
                          placeholder="e.g., MUM"
                          maxLength={3}
                        />
                      </div>
                      <Button onClick={handleCreateTeam} className="w-full cricket-gradient">
                        Add Team
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {!selectedTournament ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a tournament</h3>
                <p className="text-gray-600 mb-4">Choose a tournament from the tournaments tab to manage teams</p>
                <Button onClick={() => setActiveTab('tournaments')} variant="outline">
                  Go to Tournaments
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTeamsForTournament(selectedTournament.id).map((team) => (
                  <Card key={team.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{team.name}</span>
                        <Badge variant="secondary">{team.shortName}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{getPlayersForTeam(team.id).length} players</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        variant="outline"
                        onClick={() => setSelectedTeam(team)}
                      >
                        Manage Players
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Player Management Modal */}
            {selectedTeam && (
              <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Manage Players - {selectedTeam.name}</DialogTitle>
                    <DialogDescription>
                      Add and manage players for this team
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Add Player Form */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <h4 className="font-medium">Add New Player</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="player-name">Player Name</Label>
                          <Input
                            id="player-name"
                            value={playerForm.name}
                            onChange={(e) => setPlayerForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Virat Kohli"
                          />
                        </div>
                        <div>
                          <Label htmlFor="player-role">Role</Label>
                          <select
                            id="player-role"
                            value={playerForm.role}
                            onChange={(e) => setPlayerForm(prev => ({ ...prev, role: e.target.value as Player['role'] }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="batsman">Batsman</option>
                            <option value="bowler">Bowler</option>
                            <option value="all-rounder">All-rounder</option>
                            <option value="wicket-keeper">Wicket-keeper</option>
                          </select>
                        </div>
                      </div>
                      <Button onClick={handleCreatePlayer} className="cricket-gradient">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </div>

                    {/* Players List */}
                    <div>
                      <h4 className="font-medium mb-4">Team Players ({getPlayersForTeam(selectedTeam.id).length})</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {getPlayersForTeam(selectedTeam.id).map((player) => (
                          <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-gray-600 capitalize">{player.role}</p>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {player.role}
                            </Badge>
                          </div>
                        ))}
                        {getPlayersForTeam(selectedTeam.id).length === 0 && (
                          <p className="text-gray-500 text-center py-4">No players added yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Live Scoring Tab */}
          <TabsContent value="scoring" className="space-y-6">
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Live Scoring</h3>
              <p className="text-gray-600 mb-4">Match scoring feature coming soon!</p>
              <p className="text-sm text-gray-500">Create tournaments and teams first, then you'll be able to set up matches and update live scores.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App